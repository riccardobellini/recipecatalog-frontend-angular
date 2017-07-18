import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'rc-new-dish-type',
  templateUrl: './new-dish-type.component.html',
  styleUrls: ['./new-dish-type.component.scss']
})
export class NewDishTypeComponent implements OnInit {

  @Output() cancelCreation = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  addDishType() {
    console.log('Adding new dish type');
  }
  cancelClicked() {
    this.cancelCreation.emit(true);
  }
}
