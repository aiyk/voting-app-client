import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { CountryService} from '../../../services/country.service';
import { StatesService} from '../../../services/states.service';
import { LgaService} from '../../../services/lga.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-lga-edit',
  templateUrl: './lga-edit.component.html',
  styleUrls: ['./lga-edit.component.scss']
})
export class LgaEditComponent implements OnInit {

  loading = false;
  lgas: State[];
  states: State[];
  countries: Country[];
  lgaForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() lgaId: string;

  lga: any = {};

  pgData = {
    title: 'Edit LGA',
    button: {
      title: 'List LGAs',
      route: 'lga'
    }
  };

  constructor(
    private countryService: CountryService,
    private notifierService: NotifierService,
    private stateService: StatesService,
    private lgaService: LgaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.loading = false;

    this.loadCountries();
    this.loadStates();

    this.lgaForm = this.formBuilder.group({
      country: [this.formData.country_id, Validators.required],
      state: [this.formData.state_id, Validators.required],
      lga: [this.formData.lganame, Validators.required]
    });

    this.pageData.changePageData(this.pgData);

    // this.countryService.getById(this.formData.country_id).subscribe(data => {
    //   this.lgaForm.controls.country.value(data.result.countryname, {});
    // });
    // this.stateService.getById(this.formData.state_id).subscribe(data => {
    //   this.lgaForm.controls.state.value(data.result.statename, {});
    // });
    // this.lgaService.getById(this.id).subscribe(data => {
    //   this.lgaForm.controls.lga.value(data.result.lganame, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.lgaForm.controls; }

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

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.lgaForm.invalid) {
          return;
      }

      this.loading = true;

      this.lga = {
        countryname: this.f.country.value,
        statename: this.f.state.value,
        lganame: this.f.lga.value
      };

      this.lgaService.update(this.lgaId, this.lga)
      .subscribe((data: {}) => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Sucessfully Edited',
          msg: 'LGA was sucessfully edited',
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
            msg: 'LGA data  was not sucessfully updated, try again.',
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
