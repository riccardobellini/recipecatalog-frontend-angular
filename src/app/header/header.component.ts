import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  open: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  clickMenu(): void {
    this.open.emit(true);
  }

  ngOnInit() {
  }

}
