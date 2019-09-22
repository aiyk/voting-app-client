import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoteService} from '../../../services/vote.service';

@Component({
  selector: 'app-vote-modal',
  templateUrl: './vote-modal.component.html',
  styleUrls: ['./vote-modal.component.scss']
})
export class VoteModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() party: any;
  @Input() initData: any;
  @Input() candidate: any;
  voterIdForm: FormGroup;
  vote: any = {};
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private voteService: VoteService
    ) { }

  ngOnInit() {
    let candidate = this.candidate.election_id;
    let party = this.party._id;
    this.voterIdForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      partyId: [party, Validators.required],
      electionId: [candidate, Validators.required]
    });
    console.log(party, candidate);
  }

  get f() { return this.voterIdForm.controls; }

  onClose() {
    this.closeModal.emit();
  }

  onVote() {

    // this.vote = this.initData;
    this.vote.party_id = this.f.partyId.value;
    this.vote.state_id = this.initData.state_id;
    this.vote.lga_id = this.initData.lga_id;
    this.vote.poolingUnit_id = this.initData.poolingUnit_id;
    this.vote.election_id = this.f.electionId.value;
    this.vote.username = this.f.username.value,
    this.vote.password = this.f.password.value,

    console.log(this.vote, this.initData);

    this.voteService.voteWithId(this.vote)
    .subscribe((data: {}) => {
        // this.router.navigate([this.returnUrl]);
        this.onClose();
        // console.log(this.vote);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
