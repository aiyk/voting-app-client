import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { LgaService} from '../../../services/lga.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-lga-form',
  templateUrl: './lga-form.component.html',
  styleUrls: ['./lga-form.component.scss']
})
export class LgaFormComponent implements OnInit {

  loading = false;
  states: State[];
  countries: Country[];
  lgas: Lga[];
  lgaForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  lga: any = {};

  pgData = {
    title: 'New LGA',
    button: {
      title: 'List LGAs',
      route: 'lga'
    }
  };

  constructor(
    private countryService: CountryService,
    private stateService: StatesService,
    private lgaService: LgaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadCountries();
    this.loadStates();

    this.lgaForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required]
    });


    this.pageData.changePageData(this.pgData);
    // this.stateService.getById(this.id).subscribe(data => {
    //   this.lgaForm.controls.state.setValue (data.result.statename, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.lgaForm.controls; }

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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.lgaForm.invalid) {
        return;
    }

    this.loading = true;

    let lga = {
      lganame: this.f.lga.value,
      state_id: this.f.state.value,
      country_id: this.f.country.value
    };

    this.lgaService.create(lga)
    .subscribe((data: {}) => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
