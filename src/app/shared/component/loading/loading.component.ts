import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
    selector: 'ap-loadingBar',
    templateUrl: './loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit {

    loadingState$: Observable<string>;

    constructor(private loadingService: LoadingService){}

    ngOnInit(): void {

        this.loadingState$ = this.loadingService.getLoading();

    }


}