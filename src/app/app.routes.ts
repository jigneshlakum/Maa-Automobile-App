import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard, LoginGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'customers',
        title: 'Customers',
        loadChildren: () => import('./Components/Customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'booking',
        title: 'Booking-Car',
        loadChildren: () => import('./Components/booking-car/booking-car.module').then(m => m.BookingCarModule)
      },
    ],
  },
];
