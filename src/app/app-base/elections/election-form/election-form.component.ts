import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { Election } from '../../../_models/election';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { ElectionService} from '../../../services/election.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-election-form',
  templateUrl: './election-form.component.html',
  styleUrls: ['./election-form.component.scss']
})
export class ElectionFormComponent implements OnInit {

  loading = false;
  elections: Election[];
  countries: Country[];
  electionForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  election: any = {};

  pgData = {
    title: 'New Election',
    button: {
      title: 'List elections',
      route: 'elections'
    }
  };

  constructor(
    private countryService: CountryService,
    private electionservice: ElectionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadCountries();
    this.electionForm = this.formBuilder.group({
      country: ['', Validators.required],
      election: ['', Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    // this.electionservice.getById(this.id).subscribe(data => {
    //   this.electionForm.controls.state.setValue (data.result.electionname, {});
    // });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './countries';
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.electionForm.controls; }

  loadCountries(){
    this.countryService.getAll().subscribe(countries => {
      if(countries){
        this.loading = false;
        this.countries = countries.result;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.electionForm.invalid) {
        return;
    }

    this.loading = true;

    let election = {
      electionname: this.f.election.value,
      country_id: this.f.country.value
    };

    this.electionservice.create(election)
    .subscribe((data: {}) => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
