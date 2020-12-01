import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient, IngredientEdit } from 'app/ingredient';

export interface IngredientDialogData {
  action: 'create' | 'edit',
  data: IngredientEdit
}

@Component({
  selector: 'rc-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.scss']
})
export class AddEditIngredientComponent implements OnInit {

  action: 'create' | 'edit' | undefined;

  model: IngredientEdit;

  constructor(
    public dialogRef: MatDialogRef<AddEditIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) data: IngredientDialogData) {
      this.action = data?.action;
      if (data?.action === 'edit') {
        this.model = data.data;
      } else {
        this.model = new Ingredient();
      }
    }

  ngOnInit(): void {
  }

}
