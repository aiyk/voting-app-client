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
import { StateEditComponent } from './states/state-edit/state-edit.component';
import { LgaListComponent } from './lga/lga-list/lga-list.component';
import { LgaEditComponent } from './lga/lga-edit/lga-edit.component';
import { LgaFormComponent } from './lga/lga-form/lga-form.component';
import { PoolingUnitListComponent } from './pooling-unit/pooling-unit-list/pooling-unit-list.component';
import { PoolingUnitFormComponent } from './pooling-unit/pooling-unit-form/pooling-unit-form.component';
import { PoolingUnitEditComponent } from './pooling-unit/pooling-unit-edit/pooling-unit-edit.component';
import { ElectionListComponent } from './elections/election-list/election-list.component';
import { ElectionFormComponent } from './elections/election-form/election-form.component';
import { ElectionEditComponent } from './elections/election-edit/election-edit.component';
import { PartyListComponent } from './party/party-list/party-list.component';
import { PartyFormComponent } from './party/party-form/party-form.component';
import { PartyEditComponent } from './party/party-edit/party-edit.component';
import { PartyCandidatesComponent } from './party/party-candidates/party-candidates.component';
import { VoterListComponent } from './user/voter-list/voter-list.component';
import { VoterEditComponent } from './user/voter-edit/voter-edit.component';
import { VoterFormComponent } from './user/voter-form/voter-form.component';
import { OfficialListComponent } from './user/official-list/official-list.component';
import { OfficialEditComponent } from './user/official-edit/official-edit.component';
import { OfficialFormComponent } from './user/official-form/official-form.component';

@NgModule({
  declarations: [AppBaseComponent, MainMenuComponent, TopBarComponent, CountriesFormComponent, CountriesListComponent, UsersFormComponent, UsersListComponent, StatesFormComponent, StatesListComponent, CountryEditComponent, StateEditComponent, LgaListComponent, LgaEditComponent, LgaFormComponent, PoolingUnitListComponent, PoolingUnitFormComponent, PoolingUnitEditComponent, ElectionListComponent, ElectionFormComponent, ElectionEditComponent, PartyListComponent, PartyFormComponent, PartyEditComponent, PartyCandidatesComponent, VoterListComponent, VoterEditComponent, VoterFormComponent, OfficialListComponent, OfficialEditComponent, OfficialFormComponent],
  imports: [
    CommonModule,
    AppBaseRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class AppBaseModule { }
