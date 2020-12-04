import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, BookEdit } from 'app/book';

export interface BookDialogData {
  action: 'create' | 'edit',
  data: BookEdit
}

@Component({
  selector: 'rc-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent implements OnInit {

  action: 'create' | 'edit' | undefined;

  model: BookEdit;

  constructor(
    public dialogRef: MatDialogRef<AddEditBookComponent>,
    @Inject(MAT_DIALOG_DATA) data: BookDialogData
  ) {
    this.action = data?.action;
    if (data?.action === 'edit') {
      this.model = data.data;
    } else {
      this.model = new Book();
    }
  }

  ngOnInit(): void {
  }

}
