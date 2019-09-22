import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';
import { PoolingUnit } from '../../../_models/pooling-unit';
import { Voter } from '../../../_models/voter';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { LgaService} from '../../../services/lga.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { VoterService} from '../../../services/voter.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-voter-edit',
  templateUrl: './voter-edit.component.html',
  styleUrls: ['./voter-edit.component.scss']
})
export class VoterEditComponent implements OnInit {

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
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() voterId: string;

  voter: any = {};

  pgData = {
    title: 'Edit Voters',
    button: {
      title: 'List Voter',
      route: 'voter'
    }
  };

  constructor(
    private voterService: VoterService,
    private countryService: CountryService,
    private stateService: StatesService,
    private lgaService: LgaService,
    private poolingUnitService: PoolingUnitService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadUnits();
    this.loadCountries();
    this.loadStates();
    this.loadLgas();

    this.voterForm = this.formBuilder.group({
      firstname: [this.formData.firstname, Validators.required],
      lastname: [this.formData.lastname, Validators.required],
      othernames: [this.formData.othernames, Validators.required],
      email: [this.formData.email, Validators.required],
      country: [this.formData.country_id, Validators.required],
      state: [this.formData.state_id, Validators.required],
      lga: [this.formData.lga_id, Validators.required],
      poolingunit: [this.formData.poolingUnit_id, Validators.required],
      address: [this.formData.address, Validators.required],
      occupation: [this.formData.occupation, Validators.required],
      gender: [this.formData.gender, Validators.required],
      dateOfBirth: [this.formData.dateOfBirth, Validators.required]
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

  onClose() {
    this.closeModal.emit();
  }


  loadCountries(){
    this.countryService.getAll().subscribe(country => {
      if(country){
        this.loading = false;
        this.countries = country.result;
      }
    });
  }
  loadStates(){
    this.stateService.getAll().subscribe(state => {
      if(state){
        this.loading = false;
        this.states = state.result;
      }
    });
  }
  loadLgas(){
    this.lgaService.getAll().subscribe(lga => {
      if(lga){
        this.loading = false;
        this.lgas = lga.result;
      }
    });
  }
  loadUnits(){
    this.poolingUnitService.getAll().subscribe(unit => {
      if(unit){
        this.loading = false;
        this.units = unit.result;
      }
    });
  }

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.voterForm.invalid) {
          return;
      }

      this.loading = true;

      this.voter = {
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

      this.voterService.update(this.voterId, this.voter)
      .subscribe((data: {}) => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
    }
  }

}
