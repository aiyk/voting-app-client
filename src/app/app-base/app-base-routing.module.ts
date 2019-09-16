import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';

import { AppBaseComponent } from './app-base.component';
import { CountriesFormComponent } from './countries/countries-form/countries-form.component';
import { CountryEditComponent } from './countries/country-edit/country-edit.component';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { StatesFormComponent } from './states/states-form/states-form.component';
import { StateEditComponent } from './states/state-edit/state-edit.component';
import { StatesListComponent } from './states/states-list/states-list.component';

import { LgaFormComponent } from './lga/lga-form/lga-form.component';
import { LgaEditComponent } from './lga/lga-edit/lga-edit.component';
import { LgaListComponent } from './lga/lga-list/lga-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { PoolingUnitFormComponent } from './pooling-unit/pooling-unit-form/pooling-unit-form.component';
import { PoolingUnitListComponent } from './pooling-unit/pooling-unit-list/pooling-unit-list.component';
import { ElectionFormComponent } from './elections/election-form/election-form.component';
import { ElectionListComponent } from './elections/election-list/election-list.component';
import { PartyFormComponent } from './party/party-form/party-form.component';
import { PartyListComponent } from './party/party-list/party-list.component';
import { VoterListComponent } from './user/voter-list/voter-list.component';
import { VoterFormComponent } from './user/voter-form/voter-form.component';
import { OfficialListComponent } from './user/official-list/official-list.component';
import { OfficialFormComponent } from './user/official-form/official-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'evote', pathMatch: 'full' },
  {
    path: 'evote',
    component: AppBaseComponent,
    children: [
      { path: '', redirectTo: 'countries', pathMatch: 'full' },
      { path: 'countries',  component: CountriesListComponent },
      { path: 'countries-update',  component: CountriesFormComponent },
      { path: 'states',  component: StatesListComponent },
      { path: 'states-update',  component: StatesFormComponent },
      { path: 'users',  component: UsersListComponent, canActivate: [AuthGuard] },
      { path: 'users-update',  component: UsersFormComponent },
      { path: 'lga',  component: LgaListComponent, canActivate: [AuthGuard] },
      { path: 'lga-update',  component: LgaFormComponent },
      { path: 'unit',  component: PoolingUnitListComponent, canActivate: [AuthGuard] },
      { path: 'unit-update',  component: PoolingUnitFormComponent },
      { path: 'elections',  component: ElectionListComponent, canActivate: [AuthGuard] },
      { path: 'election-update',  component: ElectionFormComponent },
      { path: 'party',  component: PartyListComponent, canActivate: [AuthGuard] },
      { path: 'party-update',  component: PartyFormComponent },
      { path: 'voter',  component: VoterListComponent, canActivate: [AuthGuard] },
      { path: 'voter-update',  component: VoterFormComponent },
      { path: 'official',  component: OfficialListComponent, canActivate: [AuthGuard] },
      { path: 'official-update',  component: OfficialFormComponent },
      // { path: 'lga-update/:id',  component: LgaEditComponent },

      // { path: 'application-form',
      //   component: ApplicationFormComponent,
      //   children: [
      //     { path: '',  component: BasicInfoComponent },
      //     { path: 'basic-info',  component: BasicInfoComponent },
      //     { path: 'olevel',  component: OLevelComponent },
      //     { path: 'qualifications',  component: ALevelComponent },
      //     { path: 'jamb',  component: JambResultComponent },
      //     { path: 'olevel-second-sitting',  component: OLevel2Component },
      //     { path: 'application-summary',  component: SummaryComponent },
      //   ]
      // },
      // { path: 'preapplication-form',  component: PreapplicationFormComponent },
      //  { path: 'pending-transaction',  component: PendingTransactionsComponent },
      // { path: 'historic-transaction',  component: ResolveHistoricTransactionComponent },
      // { path: 'payment-history',  component: PaymentHistoryComponent },
      // { path: 'acceptance-fee',  component: AcceptanceFeeComponent },
    ]
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBaseRoutingModule { }
