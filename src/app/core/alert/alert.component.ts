import { Component, Input } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert, TypeOfAlert } from './alert';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() timeout = 3000;

    alerts: Alert[] = [];

    constructor(
        private alertService: AlertService    
    ){
        this.alertService
            .getAlert()
            .subscribe(alert => {
                if(!alert) {
                    this.alerts = [];
                    return
                }
                this.alerts.push(alert);
                setTimeout(() => this.removeAlert(alert) ,this.timeout)
            })
    }

    private removeAlert(alertToDismiss: Alert): void{

        this.alerts = this.alerts.filter(alert => alert != alertToDismiss );
    }

    getAlertClass(alert: Alert): string {

       if(!alert) return '';

        switch (alert.typeOfAlert) {
            case TypeOfAlert.SUCCESS:
                return 'alert alert-success fade-out';
            case TypeOfAlert.DANGER:
                return 'alert alert-danger fade-out';
            case TypeOfAlert.INFO:
                return 'alert alert-info fade-out';
            case TypeOfAlert.WARNING:
                return 'alert alert-warning fade-out'
        }
    }

}