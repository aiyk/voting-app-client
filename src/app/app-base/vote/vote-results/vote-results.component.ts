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

        // to count votes, map through parties, for each party, increment count where party === vote.partyname
        // or _id === party

        let compiledResult = [];

        this.partyService.getAll().subscribe(party => {
          party.result.map(item => {
            let partyname = item.partyname;
            compiledResult.push({
              [partyname]: 0
            })
          });
        });

        this.elections.forEach(item => {
          item.votes.forEach(vote => {
            compiledResult.forEach(partyResult => {
              console.log(partyResult);
            })
            console.log(vote);

            this.partyService.getById(vote.party).subscribe(party => {
              if(party){
                party.result.forEach( item => {
                  if(vote.party === item._id){
                    vote.partyname = item.partyname;
                  }
                });
              }
            });
          });
        });
      }
    });
  }


}
