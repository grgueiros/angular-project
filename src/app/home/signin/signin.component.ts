import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/plataform-detector.service';

@Component({
    selector: 'ap-signin',
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {


    loginForm: FormGroup;

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>; 


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }

    ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        })
        if(this.platformDetectorService.isPlatformBrowser())
                this.userNameInput.nativeElement.focus();

    }

    login() {

        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService.authenticate(userName, password)
            .subscribe(
                () => this.router.navigate(['user', userName]), 
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    if(this.platformDetectorService.isPlatformBrowser())
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid username/password');
                }
            )
    }

}