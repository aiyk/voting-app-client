import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
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

  id: string;
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loading = false;

    this.countryForm = this.formBuilder.group({
      country: ['', Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    this.countryService.getById(this.id).subscribe(data => {
      this.countryForm.controls.country.setValue (data.result.countryname, {});
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.countryForm.controls; }

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

      this.countryService.update(this.id, this.country)
      .subscribe((data: {}) => { console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
    }
  }

}
