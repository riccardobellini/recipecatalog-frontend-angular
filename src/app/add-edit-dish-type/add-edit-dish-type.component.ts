import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DishType } from 'app/dish-type';

@Component({
  selector: 'rc-add-edit-dish-type',
  templateUrl: './add-edit-dish-type.component.html',
  styleUrls: ['./add-edit-dish-type.component.scss']
})
export class AddEditDishTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditDishTypeComponent>) { }

  model = new DishType();

  ngOnInit(): void {
  }

  undo() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close(this.model);
  }

}
