import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DishType} from '../dish-type';

@Component({
  selector: 'rc-new-dish-type',
  templateUrl: './new-dish-type.component.html',
  styleUrls: ['./new-dish-type.component.scss']
})
export class NewDishTypeComponent implements OnInit {

  @Output() cancelCreation = new EventEmitter<boolean>();

  private dishType: DishType = new DishType();

  constructor() { }

  ngOnInit() {
  }

  addDishType() {
    console.log('Adding new dish type: ');
    console.log(this.dishType);
  }
  cancelClicked() {
    this.cancelCreation.emit(true);
  }
}
