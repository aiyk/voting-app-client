import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , Subject, EMPTY} from 'rxjs';
import { Election } from '../_models/election';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  apiUrl: string = 'http://localhost:5000/api/election';
  currentUser: User;
  stompClient = null;
  socket: any;
  currentPrint: string;
  currentResult: string;
  biometricData: string;

  biometricListener = new Subject<string>();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.socket = new SockJS('http://localhost:8080/gs-biometrics');
    this.stompClient = Stomp.over(this.socket);
    this.authService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  getResults(): Observable<Election>  {
      return this.http.get<Election>(`${this.apiUrl}/getResult`);
  }
  getResult(id): Observable<Election>  {
      return this.http.get<Election>(`${this.apiUrl}/getResult/` + id);
  }

  voteWithId(vote): Observable<Election> {
    let voterChoice = {
      username: vote.username,
      password: vote.password,
      election_id: vote.election_id,
      vote: {
        party: vote.party_id,
        state: vote.state_id, // voters state(string)
        lga: vote.lga_id, // voters lga (string)
        poolingUnnit: vote.poolingUnit_id // voters pooling unit (string)
      }
    }
    return this.http.put<Election>(this.apiUrl + '/voteWithId', JSON.stringify(voterChoice));
  }
  voteWithPrints(vote): Observable<Election> {
    let printResult = JSON.parse(this.biometricData);

    if(printResult.content){
      let voterChoice = {
        voter: printResult.content,
        election_id: vote.election_id,
        vote: {
          party: vote.party_id,
          state: vote.state_id, // voters state(string)
          lga: vote.lga_id, // voters lga (string)
          poolingUnit: vote.poolingUnit_id // voters pooling unit (string)
        }
      }
      return this.http.put<Election>(this.apiUrl + '/voteWithId', JSON.stringify(voterChoice));
    }
  }

  // FINGER PRINT METHODS

  getFingerprint(): string {
    return this.currentPrint;
  }

  connect() {
      var self = this;
      self.stompClient.connect({}, function (frame) {
          console.log('Connected: ' + frame);
          console.log(self.socket._transport.url);
          self.stompClient.subscribe('/topic/biometrics', function (data) {
            //.parseData(data);
            // console.log(data);
            data = JSON.parse(data.body);
            self.biometricData = data.content;
            self.biometricListener.next();
            // console.log(self.biometricData);
          });
      });
  }

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      // setConnected(false);
      console.log("Disconnected");
  }

  sendCommand(command, data=null) {
      var action = {
          action: command,
          data: data
      };
      this.stompClient.send("/app/scan", {}, JSON.stringify(action));

      // stompClient.send("/app/scan", {}, JSON.stringify({'name': $("#name").val()}));
  }

  private parseData(data): void {
    console.log(data);
  }
}
