import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { NotifierService} from '../../../services/notifier.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  loading = false;
  countries: Country[];
  countryForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() countryId: string;
  country: any = {};

  pgData = {
    title: 'New Country',
    button: {
      title: 'List countries',
      route: 'countries'
    }
  };

  constructor(
    private countryService: CountryService,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.loading = false;

    this.countryForm = this.formBuilder.group({
      country: [this.formData.countryname, Validators.required]
    });

    this.pageData.changePageData(this.pgData);

    // this.countryService.getById(this.id).subscribe(data => {
    //   this.countryForm.controls.country.value(data.result.countryname, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.countryForm.controls; }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    if(window.confirm('are you sure you want to update this record?')){
      this.submitted = true;

      // stop here if form is invalid
      if (this.countryForm.invalid) {
          return;
      }

      this.loading = true;

      this.country = {
        countryname: this.f.country.value
      };

      this.countryService.update(this.countryId, this.country)
      .subscribe((data: {}) => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Sucessfully Edited',
          msg: 'Country was sucessfully edited',
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
            msg: 'Country data  was not sucessfully updated, try again.',
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
