import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lowercase.validator';
import { SignUpValidatorService } from './signup.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/plataform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [SignUpValidatorService]
})
export class SignUpComponent implements OnInit {

    @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement> 

    signUpForm: FormGroup;

    constructor(
        private builder: FormBuilder,
        private signupValidatorService: SignUpValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetector: PlatformDetectorService
        ){}
   
   
    ngOnInit(): void {
        this.signUpForm = this.builder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(40)
                ] 
            ],
            userName: ['',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20),
                    lowerCaseValidator
                ],
                this.signupValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14),
                    Validators.pattern(/[a-zA-Z]*\d+[a-zA-Z0-9_\-]*/)
                ]
            
            ]
        })

        if(this.platformDetector.isPlatformBrowser())
            this.inputEmail.nativeElement.focus()
    }


    signUp(){

        const newUser = this.signUpForm.getRawValue() as NewUser;

        this.signUpService.signUp(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );



    }
}