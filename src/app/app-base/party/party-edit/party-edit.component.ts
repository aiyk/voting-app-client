import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { ElectionService} from '../../../services/election.service';
import { PartyService} from '../../../services/party.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-party-edit',
  templateUrl: './party-edit.component.html',
  styleUrls: ['./party-edit.component.scss']
})
export class PartyEditComponent implements OnInit {

  loading = false;
  elections: Election[];
  partyForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() partyId: string;

  party: any = {};

  pgData = {
    title: 'Edit Party',
    button: {
      title: 'List Parties',
      route: 'party'
    }
  };

  constructor(
    private partyService: PartyService,
    private notifierService: NotifierService,
    private electionService: ElectionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;

  ngOnInit() {
    this.loading = false;

    // this.loadCountries();

    this.partyForm = this.formBuilder.group({
      partyname: [this.formData.partyname, Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.partyForm.controls; }

  onClose() {
    this.closeModal.emit();
  }

  // loadCountries(){
  //   this.countryService.getAll().subscribe(countries => {
  //     if(countries){
  //       this.loading = false;
  //       this.countries = countries.result;
  //     }
  //   });
  // }

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.partyForm.invalid) {
          return;
      }

      this.loading = true;

      this.party = {
        partyname: this.f.partyname.value
      };

      this.partyService.update(this.partyId, this.party)
      .subscribe((data: {}) => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Sucessfully Edited',
          msg: 'Party was sucessfully edited',
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
            title: 'Update failed',
            msg: 'Party data  was not sucessfully updated, try again.',
            active: true
          }

          let _self = this;
          this.notifierService.newNotification(notificaationData);
          setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      });
      this.onClose();
      this.router.navigate([this.returnUrl]);
    }
  }

}
