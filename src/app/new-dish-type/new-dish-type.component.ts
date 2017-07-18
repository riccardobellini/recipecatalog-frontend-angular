import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DishType} from '../dish-type';
import { DishTypeService } from '../dish-type.service';

@Component({
  selector: 'rc-new-dish-type',
  templateUrl: './new-dish-type.component.html',
  styleUrls: ['./new-dish-type.component.scss']
})
export class NewDishTypeComponent implements OnInit {

  @Output() hideCreation = new EventEmitter<boolean>();

  private dishType: DishType = new DishType();

  constructor(private dtService: DishTypeService) { }

  ngOnInit() {
  }

  addDishType() {
    this.dtService.createDishType(this.dishType)
      .subscribe(status => {
        if (status === 201) {
          this.dishType.name = '';
          this.hideCreation.emit(true);
        }
      });
  }
  cancelClicked() {
    this.hideCreation.emit(false);
  }
}
