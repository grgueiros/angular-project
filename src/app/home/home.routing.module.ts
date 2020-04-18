import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.conmponent';
import { LoginGuard } from '../core/auth/login.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            { 
                path: '',
                component: SignInComponent,
                data: {
                    title: 'sign in'
                }
            },
            {
                path: 'signup',
                component: SignUpComponent,
                data: {
                    title: 'sign up'
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {}