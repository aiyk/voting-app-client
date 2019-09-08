import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppBaseRoutingModule } from './app-base-routing.module';
import { AppBaseComponent } from './app-base.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CountriesFormComponent } from './countries/countries-form/countries-form.component';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { StatesFormComponent } from './states/states-form/states-form.component';
import { StatesListComponent } from './states/states-list/states-list.component';
import { CountryEditComponent } from './countries/country-edit/country-edit.component';

@NgModule({
  declarations: [AppBaseComponent, MainMenuComponent, TopBarComponent, CountriesFormComponent, CountriesListComponent, UsersFormComponent, UsersListComponent, StatesFormComponent, StatesListComponent, CountryEditComponent],
  imports: [
    CommonModule,
    AppBaseRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class AppBaseModule { }
