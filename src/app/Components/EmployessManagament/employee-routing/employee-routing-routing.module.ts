import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from '../employees/employees.component';
import { EmployeeMasterComponent } from '../employee-master/employee-master.component';
import { AddGroupComponent } from '../employee-master/add-group/add-group.component';
import { GrantParmissionComponent } from '../employee-master/grant-parmission/grant-parmission.component';
import { AddEmployeeComponent } from '../employees/add-employee/add-employee.component';

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent },
  { path: 'employee/add', component: AddEmployeeComponent },

  // group route
  { path: 'employee-group', component: EmployeeMasterComponent },
  { path: 'employee-group/add', component: AddGroupComponent },
  { path: 'employee-group/edit', component: AddGroupComponent },
  { path: 'employee-group/permission', component: GrantParmissionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingRoutingModule { }
