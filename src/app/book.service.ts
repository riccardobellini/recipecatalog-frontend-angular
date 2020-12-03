import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookEdit, BookItem } from './book';

import { PageUtilsService } from './page-utils.service';



export interface BookPagedResponse {
  content: BookItem[],
  pageable: {
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    },
    pageSize: number,
    pageNumber: number,
    offset: number,
    unpaged: boolean,
    paged: boolean
  },
  totalElements: number,
  totalPages: number,
  last: boolean,
  first: boolean,
  sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
  },
  numberOfElements: number,
  size: number,
  number: number,
  empty: boolean
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private pageUtils: PageUtilsService) { }

  getBooks(page ?: number, pageSize ?: number): Observable<BookPagedResponse> {
    return this.http.get<BookPagedResponse>('http://localhost:3000/api/v1/books', {
      params: this.pageUtils.handlePageParams(page, pageSize)
    });
  }

  searchBooks(query: string, page ?: number, pageSize ?: number): Observable<BookPagedResponse> {
    let parms: HttpParams = this.pageUtils.handlePageParams(page, pageSize);
    if (query && query.trim().length > 0) {
      parms = parms.set('q', query);
    }
    return this.http.get<BookPagedResponse>('http://localhost:3000/api/v1/books', {
      params: parms
    });
  }

  createBook(book: BookEdit) {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/api/v1/books', book, {
      headers,
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }

  editBook(book: BookEdit) {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:3000/api/v1/books/${book.id}`;
    const submit: BookEdit = {
      title: book.title
    };
    return this.http.put<BookEdit>(url, submit, {
      headers,
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }

  deleteBook(bookId: number) {
    const url = `http://localhost:3000/api/v1/books/${bookId}`;
    return this.http.delete(url, {
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }
}
