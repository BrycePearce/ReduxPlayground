import { Directive, ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green'; /* get access to the element that the directive is placed on, getting access to that exact element, then overwriting the style of the element*/
    this.elementRef.nativeElement.style.color = 'white';
  }
}