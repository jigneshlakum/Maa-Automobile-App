import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionSetupComponent } from '../commission-setup/commission-setup.component';
import { CommissionAddComponent } from '../commission-add/commission-add.component';

const routes: Routes = [
  { path: '', component: CommissionSetupComponent },
  { path: 'add', component: CommissionAddComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRouteRoutingModule { }
