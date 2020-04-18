import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[ap-darkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness: number = 108;

    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) { }


    @HostListener('mouseover')
    darkenOn() {
        this.render.setStyle(this.el.nativeElement,'filter',`brightness(${this.brightness}%)`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setStyle(this.el.nativeElement,'filter','brightness(100%)');
    }

}