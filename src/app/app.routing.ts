import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import{LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'login'
  },
  { path: 'login',        component: LoginComponent },
  { path: 'dashboard',    component: AdminLayoutComponent },
  { path: 'register',     component: RegisterComponent }
]
