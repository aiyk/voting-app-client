import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-states-form',
  templateUrl: './states-form.component.html',
  styleUrls: ['./states-form.component.scss']
})
export class StatesFormComponent implements OnInit {

  loading = false;
  states: State[];
  countries: Country[];
  stateForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  state: any = {};

  pgData = {
    title: 'New State',
    button: {
      title: 'List states',
      route: 'states'
    }
  };

  constructor(
    private countryService: CountryService,
    private notifierService: NotifierService,
    private stateService: StatesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadCountries();
    this.stateForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    // this.stateService.getById(this.id).subscribe(data => {
    //   this.stateForm.controls.state.setValue (data.result.statename, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.stateForm.controls; }

  loadCountries(){
    this.countryService.getAll().subscribe(countries => {
      if(countries){
        this.loading = false;
        this.countries = countries.result;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.stateForm.invalid) {
        return;
    }

    this.loading = true;

    let state = {
      statename: this.f.state.value,
      country_id: this.f.country.value
    };

    this.stateService.create(state)
    .subscribe((data: {}) => {
      let notificaationData = {
        type: 'success', // ERROR SUCCESS INFO
        title: 'Created Sucessfully',
        msg: 'State was sucessfully created',
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
            msg: 'State was not sucessfully created, try again',
            active: true
          }

          let _self = this;
          this.notifierService.newNotification(notificaationData);
          setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      });
  }

}
