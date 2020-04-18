import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, TypeOfAlert } from './alert';

@Injectable({providedIn:'root'})
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>(); 


    success(message: string){
        this.alert(TypeOfAlert.SUCCESS, message);
    }

    danger(message: string){
        this.alert(TypeOfAlert.DANGER, message);
    }
    warning(message: string){
        this.alert(TypeOfAlert.WARNING, message);
    }
    info(message: string){
        this.alert(TypeOfAlert.INFO, message);
    }

    private alert(typeOfAlert: TypeOfAlert, message: string) {
       this.alertSubject.next(new Alert(typeOfAlert,message));
    }

    getAlert() : Observable<Alert>{
        return this.alertSubject.asObservable();
    }


}