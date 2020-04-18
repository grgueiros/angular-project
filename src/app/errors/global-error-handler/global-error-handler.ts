import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js'
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { LogServerService } from './log-server.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    
    
    constructor(private injector: Injector){}

    handleError(error: any): void {
       
        const message = error.message ? error.message : error.toString();
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const logServerService = this.injector.get(LogServerService);

        const url = location instanceof PathLocationStrategy
        ? location.path()
        : '';

       StackTrace.fromError(error)
        .then(stackTrace => {
            const stackAsString = stackTrace
                .map(stackFrame => stackFrame.toString())
                .join('\n')
            console.log(stackAsString)
            console.log(message)
            
            logServerService.log({ 
                message, 
                url, 
                userName: userService.getUserName(), 
                stack: stackAsString
            })
                .subscribe(() => console.log('Error logged'));
            
        })
    }
}