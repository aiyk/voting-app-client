import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , EMPTY, Subject} from 'rxjs';
import { Voter } from '../_models/voter';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

declare var SockJS;
declare var Stomp;
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  apiUrl: string = 'http://localhost:5000/api/voter';
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
          console.log(data); 
          this.biometricData = data;
          self.biometricListener.next();
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


  getAll(): Observable<Voter>  {
      return this.http.get<Voter>(`${this.apiUrl}/retrieve`);
  }

  getById(id): Observable<Voter>  {
    return this.http.get<Voter>(`${this.apiUrl}/retrieve/` + id);
}

  create(voter): Observable<Voter> {
    if(this.biometricData){
      voter.fingerprint = this.biometricData;
      return this.http.post<Voter>(this.apiUrl + '/create', JSON.stringify(voter));
    }
  }

  update(id, voter): Observable<Voter> {
    return this.http.put<Voter>(this.apiUrl + '/update/' + id, JSON.stringify(voter));
  }
  delete(id): Observable<Voter> {
    return this.http.delete<Voter>(this.apiUrl + '/delete/' + id);
  }
}
