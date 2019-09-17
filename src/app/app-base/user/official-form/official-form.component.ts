import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PoolingUnit } from '../../../_models/pooling-unit';
import { Official } from '../../../_models/official';

import { AuthService } from '../../../services/auth.service';
import { OfficialService} from '../../../services/official.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-official-form',
  templateUrl: './official-form.component.html',
  styleUrls: ['./official-form.component.scss']
})
export class OfficialFormComponent implements OnInit {

  loading = false;
  officials: Official[];
  units: PoolingUnit[];
  officialForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  id: string;
  official: any = {};

  pgData = {
    title: 'New Official',
    button: {
      title: 'List Officials',
      route: 'official'
    }
  };

  constructor(
    private officialService: OfficialService,
    private unitService: PoolingUnitService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadUnits();

    this.officialForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      othernames: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      poolingunit: ['', Validators.required]
    });


    this.pageData.changePageData(this.pgData);
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.officialForm.controls; }

  loadUnits(){
    this.unitService.getAll().subscribe(units => {
      if(units){
        this.loading = false;
        this.units = units.result;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.officialForm.invalid) { 
        return;
    }

    this.loading = true;

    let official = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      othername: this.f.othernames.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      poolingUnit_id: this.f.poolingunit.value
    };

    this.officialService.create(official)
    .subscribe((data: {}) => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
