import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Election } from '../../../_models/election';
import { Party } from '../../../_models/party';

import { AuthService } from '../../../services/auth.service';
import { ElectionService} from '../../../services/election.service';
import { PartyService} from '../../../services/party.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-party-candidates',
  templateUrl: './party-candidates.component.html',
  styleUrls: ['./party-candidates.component.scss']
})
export class PartyCandidatesComponent implements OnInit {

  loading = false;
  parties: Party[];
  elections: Election[];
  partyForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() partyId: string;

  id: string;
  candidate: any = {};

  pgData = {
    title: 'Edit Party Candidates',
    button: {
      title: 'List parties',
      route: 'party'
    }
  };

  constructor(
    private electionService: ElectionService,
    private partyService: PartyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.loading = false;

    this.loadElection();
    this.partyForm = this.formBuilder.group({
      election: ['', Validators.required],
      candidate: ['', Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.partyForm.controls; }

  onClose() {
    this.closeModal.emit();
  }

  loadElection(){
    this.electionService.getAll().subscribe(elections => {
      if(elections){
        this.loading = false;
        this.elections = elections.result;
      }
    });
  }

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.partyForm.invalid) { console.log(this.partyForm);
          return;
      }

      this.loading = true;
      let electionReturned: any;

      this.electionService.getById(this.f.election.value).subscribe(election => {
        if(election){
          electionReturned = election.result;
          this.candidate = {
            election_id: this.f.election.value,
            electionname: electionReturned.electionname,
            candidatename: this.f.candidate.value
          };

          this.partyService.updateCandidate(this.partyId, this.candidate)
          .subscribe((data: {}) => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
        }
      });

    }
  }

}
