import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';
import { PoolingUnit } from '../../../_models/pooling-unit';
import { Voter } from '../../../_models/voter';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { VoterService} from '../../../services/voter.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { LgaService} from '../../../services/lga.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-voter-form',
  templateUrl: './voter-form.component.html',
  styleUrls: ['./voter-form.component.scss']
})
export class VoterFormComponent implements OnInit {

  loading = false;
  voters: Voter[];
  countries: Country[];
  states: State[];
  lgas: Lga[];
  units: PoolingUnit[];
  voterForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  voter: any = {};

  pgData = {
    title: 'New Voter',
    button: {
      title: 'List Voters',
      route: 'voter'
    }
  };

  constructor(
    private voterService: VoterService,
    private notifierService: NotifierService,
    private countryService: CountryService,
    private stateService: StatesService,
    private lgaService: LgaService,
    private unitService: PoolingUnitService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadCountries();
    this.loadStates();
    this.loadLgas();
    this.loadUnits();

    this.voterForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      othernames: [''],
      useCredentials: [''],
      email: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      poolingunit: ['', Validators.required],
      address: ['', Validators.required],
      occupation: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });


    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
    this.voterService.connect();
    this.voterService.biometricListener.subscribe(val => {

    });
  }

  ngOnDestroy(){
    this.voterService.disconnect();
  }

  // convenience getter for easy access to form fields
  get f() { return this.voterForm.controls; }

  capturePrints(){
    this.voterService.sendCommand("capture");
  }

  loadCountries(){
    this.countryService.getAll().subscribe(countries => {
      if(countries){
        this.loading = false;
        this.countries = countries.result;
      }
    });
  }
  loadStates(){
    this.stateService.getAll().subscribe(states => {
      if(states){
        this.loading = false;
        this.states = states.result;
      }
    });
  }
  loadLgas(){
    this.lgaService.getAll().subscribe(lgas => {
      if(lgas){
        this.loading = false;
        this.lgas = lgas.result;
      }
    });
  }
  loadUnits(){
    this.unitService.getAll().subscribe(units => {
      if(units){
        this.loading = false;
        this.units = units.result;
      }
    });
  }

  calculate_age(birth_month,birth_day,birth_year){
      let today_date = new Date();
      let today_year = today_date.getFullYear();
      let today_month = today_date.getMonth();
      let today_day = today_date.getDate();
      let age = today_year - birth_year;

      if ( today_month < (birth_month - 1))
      {
          age--;
      }
      if (((birth_month - 1) == today_month) && (today_day < birth_day))
      {
          age--;
      }
      return age;
  }

  onSubmit() {
    let splited = this.f.dateOfBirth.value.split('-');
    let age = this.calculate_age(splited[1],splited[2],splited[0]);

    if(age > 17){

      this.submitted = true;

      // stop here if form is invalid
      if (this.voterForm.invalid) {
          return;
      }

      this.loading = true;

      let voter = {
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        othernames: this.f.othernames.value,
        email: this.f.email.value,
        country_id: this.f.country.value,
        state_id: this.f.state.value,
        lga_id: this.f.lga.value,
        poolingUnit_id: this.f.poolingunit.value,
        occupation: this.f.occupation.value,
        address: this.f.address.value,
        gender: this.f.gender.value,
        dateOfBirth: this.f.dateOfBirth.value
      };

      this.voterService.create(voter)
      .subscribe((data: {}) => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Created Sucessfully',
          msg: 'Voter was sucessfully created',
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
            msg: 'Voter was not sucessfully created, try again',
            active: true
          }

          let _self = this;
          this.notifierService.newNotification(notificaationData);
          setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      });
    } else {
      window.alert('you are not old enough to vote');
    }
  }
}
