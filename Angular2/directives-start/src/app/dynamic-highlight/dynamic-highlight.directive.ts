import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDynamicHighlight]'
})
export class DynamicHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'blue' // our default for the background color
  @Input() highlightColor: string = 'red' // this is a default for dynamic color (it is overwritten in app.component.html)
  @HostBinding('style.backgroundColor') backgroundColor: string; // we are using host binding method for this, but don't have to. Refer to better-highlight for the other method
  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }
  // mouse-over effects
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}

/*
 * Note: Check app.component.html for the dynamically added colors
 * 
 */
