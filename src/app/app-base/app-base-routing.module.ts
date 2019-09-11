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

const routes: Routes = [
  { path: '', redirectTo: 'evote', pathMatch: 'full' },
  {
    path: 'evote',
    component: AppBaseComponent,
    children: [
      { path: '', redirectTo: 'countries', pathMatch: 'full' },
      { path: 'countries',  component: CountriesListComponent },
      { path: 'countries-update',  component: CountriesFormComponent },
      // { path: 'countries-update/:id',  component: CountryEditComponent },
      { path: 'states',  component: StatesListComponent },
      { path: 'states-update',  component: StatesFormComponent },
      // { path: 'states-update/:id',  component: StateEditComponent },
      { path: 'users',  component: UsersListComponent, canActivate: [AuthGuard] },
      { path: 'users-update',  component: UsersFormComponent },
      // { path: 'users-update/:id',  component: UsersFormComponent },
      { path: 'lga',  component: LgaListComponent, canActivate: [AuthGuard] },
      { path: 'lga-update',  component: LgaFormComponent },
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
