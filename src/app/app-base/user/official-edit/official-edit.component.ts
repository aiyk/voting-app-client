import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PoolingUnit } from '../../../_models/pooling-unit';
import { Official } from '../../../_models/official';

import { AuthService } from '../../../services/auth.service';
import { PoolingUnitService} from '../../../services/pooling-unit.service';
import { OfficialService} from '../../../services/official.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-official-edit',
  templateUrl: './official-edit.component.html',
  styleUrls: ['./official-edit.component.scss']
})
export class OfficialEditComponent implements OnInit {

  loading = false;
  officials: Official[];
  units: PoolingUnit[];
  officialForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  editMode = false;

  @Output() closeModal = new EventEmitter();
  @Input() formData: any;
  @Input() officialId: string;

  official: any = {};

  pgData = {
    title: 'Edit Official',
    button: {
      title: 'List Official',
      route: 'official'
    }
  };

  constructor(
    private officialService: OfficialService,
    private poolingUnitService: PoolingUnitService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = false;

    this.loadUnits();

    this.officialForm = this.formBuilder.group({
      firstname: [this.formData.firstname, Validators.required],
      lastname: [this.formData.lastname, Validators.required],
      othernames: [this.formData.othernames, Validators.required],
      email: [this.formData.email, Validators.required],
      phone: [this.formData.email, Validators.required],
      poolingunit: [this.formData.poolingUnit_id, Validators.required]
    });

    this.pageData.changePageData(this.pgData);

    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.officialForm.controls; }

  onClose() {
    this.closeModal.emit();
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
      if (this.officialForm.invalid) {
          return;
      }

      this.loading = true;

      this.official = {
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        othernames: this.f.othernames.value,
        email: this.f.email.value,
        phone: this.f.phone.value,
        poolingUnit_id: this.f.poolingunit.value
      };

      this.officialService.update(this.officialId, this.official)
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
