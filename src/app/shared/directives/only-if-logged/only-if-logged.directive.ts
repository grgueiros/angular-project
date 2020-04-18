import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[ap-onlyIfLogged]'
})
export class OnlyIfLoggedDirective implements OnInit {

    currentDisplay: CSSStyleDeclaration;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private userService: UserService
    ) { }


    ngOnInit(): void {

        this.userService.getUser()
            .subscribe(user => {
                if (user) {
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'inline')
                } else {
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                }
            })

    }

}