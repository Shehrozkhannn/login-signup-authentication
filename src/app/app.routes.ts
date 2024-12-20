import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent:() => import ('./components/login/login.component').then((m)=> m.LoginComponent) 
    },
    {
        path: 'register',
        loadComponent:() => import ('./components/signup/signup.component').then((m)=> m.SignupComponent) 
    },
    {
        path: 'dashboard',
        loadComponent: () => import ('./components/main/main.component').then((e)=> e.MainComponent)
    },
    {
        path: 'users',
        loadComponent: () => import ('./components/users/users.component').then((e)=> e.UsersComponent)
    }
];
