import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: PostFormComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
