import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'; // we only need this line for lines 19 && 25, which we can use, or not. Either method is correct.
  // https://angular.io/api/core/Renderer2
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
    // this is fine but non-interactive, we use HostListener below to make it interactive
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue' /*,flag args here, could do !important or something */)
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white')
  }

  // mouse-over effects, https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter . Mouseover() could be named anything.
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.backgroundColor = 'blue'; ((HostBinding way to do it))
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white')
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    // this.backgroundColor = 'transparent';  ((HostBinding way to do it))
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'blue')
  }
}
