import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IngredientEdit, IngredientItem } from "./ingredient";
import { PageUtilsService } from './page-utils.service';


export interface IngredientPagedResponse {
  content: IngredientItem[],
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
export class IngredientService {

  constructor(private http: HttpClient, private pageUtils: PageUtilsService) { }

  getIngredients(page ?: number, pageSize ?: number): Observable<IngredientPagedResponse> {
    return this.http.get<IngredientPagedResponse>('http://localhost:3000/api/v1/ingredients', {
      params: this.pageUtils.handlePageParams(page, pageSize)
    });
  }

  searchIngredients(query: string, page ?: number, pageSize ?: number): Observable<IngredientPagedResponse> {
    let parms: HttpParams = this.pageUtils.handlePageParams(page, pageSize);
    if (query && query.trim().length > 0) {
      parms = parms.set('q', query);
    }
    return this.http.get<IngredientPagedResponse>('http://localhost:3000/api/v1/ingredients', {
      params: parms
    });
  }

  createIngredient(ingr: IngredientEdit) {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/api/v1/ingredients', ingr, {
      headers,
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }

  editIngredient(ingr: IngredientEdit) {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:3000/api/v1/ingredients/${ingr.id}`;
    const submit: IngredientEdit = {
      name: ingr.name
    };
    return this.http.put<IngredientEdit>(url, submit, {
      headers,
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }

  deleteIngredient(ingrId: number) {
    const url = `http://localhost:3000/api/v1/ingredients/${ingrId}`;
    return this.http.delete(url, {
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }
}
