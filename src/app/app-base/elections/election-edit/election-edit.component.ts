import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../_models/country';
import { State } from '../../../_models/state';
import { Lga } from '../../../_models/lga';
import { PoolingUnit } from '../../../_models/pooling-unit';

import { AuthService } from '../../../services/auth.service';
import { NotifierService} from '../../../services/notifier.service';
import { CountryService} from '../../../services/country.service';
import { ElectionService} from '../../../services/election.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-election-edit',
  templateUrl: './election-edit.component.html',
  styleUrls: ['./election-edit.component.scss']
})
export class ElectionEditComponent implements OnInit {

  loading = false;
  units: PoolingUnit[];
  lgas: Lga[];
  states: State[];
  countries: Country[];
  electionForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() electionId: string;

  election: any = {};

  pgData = {
    title: 'Edit Election',
    button: {
      title: 'List Election',
      route: 'elections'
    }
  };

  constructor(
    private countryService: CountryService,
    private notifierService: NotifierService,
    private electionService: ElectionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;

  ngOnInit() {
    this.loading = false;

    this.loadCountries();

    this.electionForm = this.formBuilder.group({
      country: [this.formData.country_id, Validators.required],
      election: [this.formData.electionname, Validators.required]
    });

    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.electionForm.controls; }

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
      if (this.electionForm.invalid) {
          return;
      }

      this.loading = true;

      this.election = {
        countryname: this.f.country.value,
        electionname: this.f.election.value
      };

      this.electionService.update(this.electionId, this.election)
      .subscribe((data: {}) => {
        let notificaationData = {
          type: 'success', // ERROR SUCCESS INFO
          title: 'Sucessfully Edited',
          msg: 'Election was sucessfully edited',
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
            msg: 'Election data  was not sucessfully updated, try again.',
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
