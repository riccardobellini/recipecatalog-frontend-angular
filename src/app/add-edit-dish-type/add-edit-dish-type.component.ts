import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DishType, DishTypeItem } from 'app/dish-type';

export interface DishTypeDialogData {
  action: 'create' | 'edit',
  data: DishTypeItem
}

@Component({
  selector: 'rc-add-edit-dish-type',
  templateUrl: './add-edit-dish-type.component.html',
  styleUrls: ['./add-edit-dish-type.component.scss']
})
export class AddEditDishTypeComponent implements OnInit {

  action: 'create' | 'edit' | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditDishTypeComponent>,
    @Inject(MAT_DIALOG_DATA) data: DishTypeDialogData) {
      this.action = data?.action;
      if (data?.action === 'edit') {
        this.model = data.data;
      } else {
        this.model = new DishType();
      }
    }

  model: DishType;

  ngOnInit(): void {
  }

}
