import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[rcNoHref]',
  host : {
    '(click)' : 'preventDefault($event)'
  }
})
export class NoHrefDirective {

  @Input() href;

  preventDefault(event) {
    if(this.href.length == 0) event.preventDefault();
  }

  constructor() { }

}
