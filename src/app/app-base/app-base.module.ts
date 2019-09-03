import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBaseRoutingModule } from './app-base-routing.module';
import { AppBaseComponent } from './app-base.component';

@NgModule({
  declarations: [AppBaseComponent],
  imports: [
    CommonModule,
    AppBaseRoutingModule
  ]
})
export class AppBaseModule { }
