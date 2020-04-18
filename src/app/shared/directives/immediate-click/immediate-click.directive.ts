import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/plataform-detector.service';

@Directive({
    selector: '[immediate-click]'
})
export class ImmediateClickDirective implements OnInit {


    constructor(
        private platformDetector: PlatformDetectorService,
        private element: ElementRef<any>
    ) { }
   
   
    ngOnInit(): void {
        if(this.platformDetector.isPlatformBrowser())
            this.element.nativeElement.click();
    }


    

}