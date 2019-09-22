import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { ElectionService} from '../../../services/election.service';
import { PartyService} from '../../../services/party.service';
import { ActivePageService} from '../../../services/active-page.service';


@Component({
  selector: 'app-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.scss']
})
export class VoteResultsComponent implements OnInit {

  loading = false;
  elections: Election[];
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  initData: any = {};
  compiledResult = [];

  pgData = {
    title: 'Vote Results',
    button: {
      title: 'Initialize',
      route: 'vote'
    }
  };

  constructor(
    private electionService: ElectionService,
    private partyService: PartyService,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadElections();

    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
  }

  loadElections(){
    this.electionService.getAll().subscribe(elections => {
      if(elections){
        this.loading = false;
        this.elections = elections.result;

        this.partyService.getAll().subscribe(party => {
          party.result.map(item => {
            let partyname = item.partyname;
            item.candidates.forEach( candidate =>{
              if(this.compiledResult.length === 0){
                this.compiledResult.push([ partyname, 0, candidate.electionname ]);
              }
              let notInList = true;
              this.compiledResult.forEach(entry => {
                if(entry[0] === partyname && entry[2] === candidate.electionname){
                  notInList = false;
                }
              });

              if(notInList){
                this.compiledResult.push([ partyname, 0, candidate.electionname ]);
                notInList = false;
              }
            });
            this.elections.forEach(item => {
              item.votes.forEach(vote => {
                this.partyService.getById(vote.party).subscribe(party => {
                  if(party){
                    party.result.forEach( party_item => {
                      if(vote.party === party_item._id){
                        vote.partyname = party_item.partyname;
                      }
                    });
                  }
                  this.compiledResult.forEach(partyResult => {
                    if( partyResult[0] === vote.partyname && partyResult[2] === item.electionname){
                      partyResult[1] += 1;
                    }
                  });
                });
              });
            });
          });
        });

      }
    });
  }


}
