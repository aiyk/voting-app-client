import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';
import { PoolingUnit } from '../../../_models/pooling-unit';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { LgaService} from '../../../services/lga.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-pooling-unit-form',
  templateUrl: './pooling-unit-form.component.html',
  styleUrls: ['./pooling-unit-form.component.scss']
})
export class PoolingUnitFormComponent implements OnInit {

  loading = false;
  states: State[];
  countries: Country[];
  lgas: Lga[];
  units: PoolingUnit[];
  unitForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  unit: any = {};

  pgData = {
    title: 'New Pooling Unit',
    button: {
      title: 'List Pooling Units',
      route: 'unit'
    }
  };

  constructor(
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

    this.unitForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      unit: ['', Validators.required]
    });


    this.pageData.changePageData(this.pgData);
    // this.stateService.getById(this.id).subscribe(data => {
    //   this.unitForm.controls.state.setValue (data.result.statename, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.unitForm.controls; }

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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.unitForm.invalid) {
        return;
    }

    this.loading = true;

    let unit = {
      unitname: this.f.unit.value,
      lga_id: this.f.lga.value,
      state_id: this.f.state.value,
      country_id: this.f.country.value
    };
    console.log(unit);
    this.unitService.create(unit)
    .subscribe((data: {}) => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
