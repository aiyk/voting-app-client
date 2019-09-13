import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.scss']
})
export class StateEditComponent implements OnInit {

  loading = false;
  states: State[];
  countries: Country[];
  stateForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;

  id: string;
  state: any = {};

  pgData = {
    title: 'Edit State',
    button: {
      title: 'List states',
      route: 'states'
    }
  };

  constructor(
    private countryService: CountryService,
    private stateService: StatesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loading = false;

    this.loadCountries();
    this.stateForm = this.formBuilder.group({
      country: [this.formData.country_id, Validators.required],
      state: [this.formData.statename, Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    this.countryService.getById(this.formData.country_id).subscribe(data => {
      this.stateForm.controls.country.value(data.result.countryname, {});
    });
    // this.stateService.getById(this.id).subscribe(data => {
    //   this.stateForm.controls.state.setValue (data.result.statename, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.stateForm.controls; }

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

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.stateForm.invalid) {
          return;
      }

      this.loading = true;

      this.state = {
        countryname: this.f.country.value,
        statename: this.f.state.value
      };

      this.stateService.update(this.id, this.state)
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
