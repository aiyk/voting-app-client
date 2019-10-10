import { Component, OnInit } from '@angular/core';
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
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.scss']
})
export class PartyFormComponent implements OnInit {

  loading = false;
  elections: Election[];
  partyForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  party: any = {};

  pgData = {
    title: 'New Party',
    button: {
      title: 'List parties',
      route: 'party'
    }
  };

  constructor(
    private partyService: PartyService,
    private notifierService: NotifierService,
    private electionservice: ElectionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    // this.loadCountries();
    this.partyForm = this.formBuilder.group({
      partyname: ['', Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    // this.electionservice.getById(this.id).subscribe(data => {
    //   this.partyForm.controls.state.setValue (data.result.electionname, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.partyForm.controls; }

  // loadCountries(){
  //   this.partyService.getAll().subscribe(countries => {
  //     if(countries){
  //       this.loading = false;
  //       this.countries = countries.result;
  //     }
  //   });
  // }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.partyForm.invalid) {
        return;
    }

    this.loading = true;

    let party = {
      partyname: this.f.partyname.value,
      candidates: []
    };

    this.partyService.create(party)
    .subscribe((data: {}) => {
      let notificaationData = {
        type: 'success', // ERROR SUCCESS INFO
        title: 'Created Sucessfully',
        msg: 'Party was sucessfully created',
        active: true
      }

      let _self = this;
      this.notifierService.newNotification(notificaationData);
      setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
          let notificaationData = {
            type: 'error', // ERROR SUCCESS INFO
            title: 'Error',
            msg: 'Party was not sucessfully created, try again',
            active: true
          }

          let _self = this;
          this.notifierService.newNotification(notificaationData);
          setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      });
  }

}
