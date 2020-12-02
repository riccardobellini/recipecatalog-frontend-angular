import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rc-delete-ingredient-confirm',
  templateUrl: './delete-ingredient-confirm.component.html',
  styleUrls: ['./delete-ingredient-confirm.component.scss']
})
export class DeleteIngredientConfirmComponent implements OnInit {

  ingrName: string;

  constructor(@Inject(MAT_DIALOG_DATA) ingrName: string) {
    this.ingrName = ingrName;
  }

  ngOnInit(): void {
  }

}
