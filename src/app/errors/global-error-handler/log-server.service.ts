import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogModel } from './logModel';

const API = 'http://localhost:7000'

@Injectable({ providedIn: 'root'})
export class LogServerService {

    constructor(private http: HttpClient){ }

    log(errorLog : LogModel){

        return this.http.post(API + '/infra/log', errorLog)
    }

}