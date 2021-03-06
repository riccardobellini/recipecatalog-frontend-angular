import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AddEditBookComponent, BookDialogData } from 'app/add-edit-book/add-edit-book.component';
import { BookEdit, BookItem } from 'app/book';
import { DeleteBookConfirmComponent } from 'app/delete-book-confirm/delete-book-confirm.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BookPagedResponse, BookService } from "../book.service";

import { BooksDataSource } from './books-datasource';

@Component({
  selector: 'rc-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<BookItem>;

  dataSource: BooksDataSource;

  filterInput: FormControl;

  private _unsubscribeAll: Subject<any>;

  totalElements: number;
  loading = false;

  private _books$: BehaviorSubject<BookItem[]>;

  private get book$() {
    return this._books$.asObservable();
  }

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) {
    this._books$ = new BehaviorSubject([]);
    this.filterInput = new FormControl('');

    this._unsubscribeAll = new Subject();
  }

  displayedColumns = ['id', 'title', 'creationTime', 'lastModificationTime', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.dataSource = new BooksDataSource(this.book$);
    this.filterInput.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.paginator.firstPage();
      this.fetchBooksList();
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium]).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(
      result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.displayedColumns = ['title', 'actions'];
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.displayedColumns = ['title', 'creationTime', 'actions'];
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedColumns = ['title', 'creationTime', 'lastModificationTime', 'actions'];
        } else {
          this.displayedColumns = ['id', 'title', 'creationTime', 'lastModificationTime', 'actions'];
        }
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.paginator.page.pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(_ => this.fetchBooksList());

    this.fetchBooksList();
  }

  private updateBooks = (resp: BookPagedResponse) => {
    this.totalElements = resp.totalElements;
    this._books$.next(resp.content);
  }

  private fetchBooksList = () => {
    const filter = this.filterInput.value;
    this.bookService.searchBooks(filter, this.paginator.pageIndex, this.paginator.pageSize).pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(resp => {
      this.updateBooks(resp);
      this.loading = false;
    });
  }

  deleteBook = (book: BookItem) => {
    const dialog = this.dialog.open<DeleteBookConfirmComponent, string, boolean>(DeleteBookConfirmComponent, {
      data: book.title
    });

    dialog.afterClosed().subscribe(
      doDelete => {
        if (doDelete === true) {
          this.loading = true;
          this.bookService.deleteBook(book.id).subscribe(this.fetchBooksList);
        }
      }
    );
  }

  editBook = (book: BookItem) => {
    const dialog = this.dialog.open<AddEditBookComponent, BookDialogData, BookEdit>(AddEditBookComponent, {
      data: {
        action: 'edit',
        data: { ...book }
      }
    });

    dialog.afterClosed().subscribe(
      result => {
        if (result && typeof result.id !== 'undefined' && result.title) {
          this.loading = true;
          this.bookService.editBook(result).subscribe(this.fetchBooksList);
        }
      }
    );
  }

  addBook = () => {
    const dialog = this.dialog.open<AddEditBookComponent, any, BookEdit>(AddEditBookComponent);

    dialog.afterClosed().subscribe(
      result => {
        if (result && result.title) {
          this.loading = true;
          this.bookService.createBook(result).subscribe(this.fetchBooksList);
        }
      }
    );
  }

}
