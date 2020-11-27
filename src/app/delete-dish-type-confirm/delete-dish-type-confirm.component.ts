import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rc-delete-dish-type-confirm',
  templateUrl: './delete-dish-type-confirm.component.html',
  styleUrls: ['./delete-dish-type-confirm.component.scss']
})
export class DeleteDishTypeConfirmComponent implements OnInit {

  dtName: string;

  constructor(@Inject(MAT_DIALOG_DATA) dtName: string) {
    this.dtName = dtName;
  }

  ngOnInit(): void {
  }

}
