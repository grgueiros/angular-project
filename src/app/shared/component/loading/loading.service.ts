import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LoadingType } from './loading-type';
import { map, tap, startWith } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class LoadingService {

    loadingSubject = new Subject<LoadingType>();

    start(){
        this.loadingSubject.next(LoadingType.LOADING);
    }

    stop(){
        this.loadingSubject.next(LoadingType.STOPPED);
    }


    getLoading(): Observable<string> {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED))
            .pipe(map((loadingType : LoadingType) => loadingType.valueOf()))
    }


}