import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {DishType} from '../dish-type';
import { DishTypeService } from '../dish-type.service';

@Component({
  selector: 'rc-new-dish-type',
  templateUrl: './new-dish-type.component.html',
  styleUrls: ['./new-dish-type.component.scss']
})
export class NewDishTypeComponent implements OnInit {

  @Output() hideCreation = new EventEmitter<boolean>();

  @Input() dishType: DishType = new DishType();
  @Input() isEdit = false;

  constructor(private dtService: DishTypeService) { }

  ngOnInit() {
  }

  saveDishType() {
    if (!this.isEdit) {
      this.dtService.createDishType(this.dishType)
        .subscribe(status => {
          if (status === 201) {
            this.dishType.name = '';
            this.hideCreation.emit(true);
          }
        });
    } else {
      console.log('Editing...');
      console.log(this.dishType);
    }
  }
  cancelClicked() {
    this.hideCreation.emit(false);
  }
}
