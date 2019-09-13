import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-pooling-unit-edit',
  templateUrl: './pooling-unit-edit.component.html',
  styleUrls: ['./pooling-unit-edit.component.scss']
})
export class PoolingUnitEditComponent implements OnInit {

  loading = false;
  units: PoolingUnit[];
  lgas: Lga[];
  states: State[];
  countries: Country[];
  unitForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;

  id: string;
  unit: any = {};

  pgData = {
    title: 'Edit Pooling Unit',
    button: {
      title: 'List Pooling Unit',
      route: 'unit'
    }
  };

  constructor(
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
    this.id = this.route.snapshot.params['id'];
    this.loading = false;

    this.loadCountries();
    this.loadStates();
    this.loadLgas();

    this.unitForm = this.formBuilder.group({
      country: [this.formData.country_id, Validators.required],
      state: [this.formData.state_id, Validators.required],
      lga: [this.formData.lga_id, Validators.required],
      unit: [this.formData.unitname, Validators.required]
    });

    this.pageData.changePageData(this.pgData);

    // this.countryService.getById(this.formData.country_id).subscribe(data => {
    //   this.unitForm.controls.country.value(data.result.countryname, {});
    // });
    // this.stateService.getById(this.formData.state_id).subscribe(data => {
    //   this.unitForm.controls.state.value(data.result.statename, {});
    // });
    // this.lgaService.getById(this.formData.lga_id).subscribe(data => {
    //   this.unitForm.controls.lga.value(data.result.lganame, {});
    // });
    // this.poolingUnitService.getById(this.id).subscribe(data => {
    //   this.unitForm.controls.unit.value(data.result.unitname, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.unitForm.controls; }

  onClose() {
    this.closeModal.emit();
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

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.unitForm.invalid) {
          return;
      }

      this.loading = true;

      this.unit = {
        countryname: this.f.country.value,
        statename: this.f.state.value,
        lganame: this.f.lga.value,
        unitname: this.f.unit.value
      };

      this.poolingUnitService.update(this.id, this.unit)
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
