import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Injectable({providedIn:'root'})
export class loginRequiredValidator {


    constructor(private userService: UserService){}

    validate(){

        const isLogged = this.userService.isLogged();
        return function(control : AbstractControl): {[key: string ] : boolean} | null{

            
            if(!isLogged){
                return {'loginRequired': true };
            }
            return null;

        }
    }

    
}
