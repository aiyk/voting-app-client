import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoteService} from '../../../services/vote.service';
import { NotifierService} from '../../../services/notifier.service';
import { VoterService} from '../../../services/voter.service';
import { Voter } from '../../../_models/voter';

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
  @Input() voter: any;
  voterIdForm: FormGroup;
  vote: any = {};
  loading = false;
  error = '';
  fingerprintTab = true;
  credentialTab = false;

  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private voterService: VoterService,
    private voteService: VoteService
    ) { }

  ngOnInit() {
    this.voterIdForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // console.log(party, candidate);
    //this.getVoter(this.voter._id);
    this.voterService.getAll().subscribe(voters => {
      if(voters) {
        voters.result.forEach(voter => {
          this.votersPrints.push(
            {
              id: voter._id,
              data: voter.fingerprint
            }
          )
        });
      }
    });
  }

  get f() { return this.voterIdForm.controls; }

  onClose() {
    this.closeModal.emit();
    this.credentialTab = false;
    this.fingerprintTab = false;
  }
  getVoter(voter_id){
    this.voterService.getById(voter_id).subscribe(voter => {
      if(voter) {
        this.loading = false;
        this.voter = voter.result;
      }
    });
  }
  onFingerprintTab(){
    this.fingerprintTab = true;
    this.credentialTab = false;
  }
  onUsercredTab(){
    this.fingerprintTab = false;
    this.credentialTab = true;
  }

  onVote() {

    // this.vote = this.initData;
    this.vote.party_id = this.party._id;
    this.vote.state_id = this.initData.state_id;
    this.vote.lga_id = this.initData.lga_id;
    this.vote.poolingUnit_id = this.initData.poolingUnit_id;
    this.vote.election_id = this.candidate.election_id;
    this.vote.username = this.f.username.value,
    this.vote.password = this.f.password.value,

    // console.log(this.vote);

    this.voteService.voteWithId(this.vote)
    .subscribe((data: {}) => {
      let notificaationData = {
        type: 'success', // ERROR SUCCESS INFO
        title: 'Voted Sucessfully',
        msg: 'Your vote was sucessfully captured',
        active: true
      }

      let _self = this;
      this.notifierService.newNotification(notificaationData);
      setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      // this.loadCountries();
    },
    error => {
      let notificaationData = {
        type: 'error', // ERROR SUCCESS INFO
        title: 'Invalid vote',
        msg: 'Your vote was not captured',
        active: true
      }

      let _self = this;
      this.notifierService.newNotification(notificaationData);
      setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
    });
    this.onClose();
    // this.router.navigate([this.returnUrl]);
  }

}
