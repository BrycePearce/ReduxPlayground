/*
 * Pure CSS way of doing this: https://codepen.io/anon/pen/oeOvjw
 */ 
import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  public text: String;
  @HostBinding('class.open') isOpen = false; // class.open is a bootstrap thing
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  // Checks to see if the clicked element is one that has the [appDropdown] on it, then
  // closes the dropdown if the clicked element was not selected.
  @HostListener('document:click', ['$event']) clickout(event) {
    if(!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
   }
  constructor(private elRef: ElementRef) { }
}

/*@HostListener('document:click', ['$event'])
clickout(event) {
  if (!this.eRef.nativeElement.contains(event.target)) {
    console.log(this.eRef.nativeElement);
    console.log(event.target);
    console.log("clicked outside");
  } else {
    console.log(this.eRef.nativeElement);
    console.log(event.target);
    console.log("clicked inside");
  }
}
constructor(private eRef: ElementRef) { }
}*/