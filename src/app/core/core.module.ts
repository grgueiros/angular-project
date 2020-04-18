import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from './alert/alert.module';
import { LoadingModule } from '../shared/component/loading/loading.module';
import { MenuModule } from '../shared/component/menu/menu.module';
import { OnlyIfLoggedModule } from '../shared/directives/only-if-logged/only-if-logged.module';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule,
        MenuModule,
        OnlyIfLoggedModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule { }