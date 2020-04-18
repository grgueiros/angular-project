import {Injectable} from '@angular/core'
import { LoadingService } from './loading.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor{


    constructor(private loadingService: LoadingService){}
    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        
        return next.handle(req)
                .pipe(tap((req) => {
                    if(req.type == HttpEventType.Response){
                        this.loadingService.stop();
                    } else {
                        this.loadingService.start();
                    }
                }))
    }
}