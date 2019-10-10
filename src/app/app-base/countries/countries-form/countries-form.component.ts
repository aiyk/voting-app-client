import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { NotifierService} from '../../../services/notifier.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-countries-form',
  templateUrl: './countries-form.component.html',
  styleUrls: ['./countries-form.component.scss']
})
export class CountriesFormComponent implements OnInit {

  loading = false;
  countries: Country[];
  countryForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

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
    this.loading = false;

    this.pageData.changePageData(this.pgData);

    this.countryForm = this.formBuilder.group({
      country: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
  }

  // convenience getter for easy access to form fields
  get f() { return this.countryForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.countryForm.invalid) {
        return;
    }

    this.loading = true;

    let country = {
      countryname: this.f.country.value
    };

    this.countryService.create(country)
    .subscribe((data: {}) => {
      let notificaationData = {
        type: 'success', // ERROR SUCCESS INFO
        title: 'Created Sucessfully',
        msg: 'Country was sucessfully created',
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
            msg: 'Country was not sucessfully created, try again',
            active: true
          }

          let _self = this;
          this.notifierService.newNotification(notificaationData);
          setTimeout(function(){ _self.notifierService.resetNotification(); }, 5000);
      });
  }

}
