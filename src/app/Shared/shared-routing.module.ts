import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthGuard } from './components/auth/auth.guard';


const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register',
    component: RegistrationComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: '**',
  redirectTo: '/login'
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
