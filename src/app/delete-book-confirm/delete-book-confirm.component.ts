import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rc-delete-book-confirm',
  templateUrl: './delete-book-confirm.component.html',
  styleUrls: ['./delete-book-confirm.component.scss']
})
export class DeleteBookConfirmComponent implements OnInit {

  bookTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) bookTitle: string) {
    this.bookTitle = bookTitle;
  }

  ngOnInit(): void {
  }

}
