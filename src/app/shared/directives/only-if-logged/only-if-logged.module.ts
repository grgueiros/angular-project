import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyIfLoggedDirective } from './only-if-logged.directive';

@NgModule({
    declarations: [OnlyIfLoggedDirective],
    imports: [CommonModule],
    exports: [OnlyIfLoggedDirective]
})
export class OnlyIfLoggedModule {

}