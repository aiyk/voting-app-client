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
  selector: 'app-vote-init',
  templateUrl: './vote-init.component.html',
  styleUrls: ['./vote-init.component.scss']
})
export class VoteInitComponent implements OnInit {

  loading = false;
  countries: Country[];
  states: State[];
  lgas: Lga[];
  units: PoolingUnit[];
  voteInitForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  initData: any = {};
  vote_mode = false;

  pgData = {
    title: 'Initialize Election',
    button: {
      title: 'Initialize',
      route: 'vote'
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
    this.loadUnits();

    this.voteInitForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      poolingunit: ['', Validators.required]
    });


    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.voteInitForm.controls; }

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

  closeModal(){
    this.vote_mode = false;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.voteInitForm.invalid) {
        return;
    }

    this.loading = true;

    this.initData = {
      country_id: this.f.country.value,
      state_id: this.f.state.value,
      lga_id: this.f.lga.value,
      poolingUnit_id: this.f.poolingunit.value
    };

    this.vote_mode = true;
  }

}
