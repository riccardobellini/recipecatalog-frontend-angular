import { RecipeItem } from './recipe-item';
import { pluck } from 'rxjs/operators';
import { CountResponse } from './count-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageUtilsService } from './page-utils.service';

export interface RecipePagedResponse {
  content: RecipeItem[],
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
export class RecipeService {

  constructor(
    private http: HttpClient,
    private pageUtils: PageUtilsService) { }

  getRecipeCount(): Observable<number> {
    return this.http.get<CountResponse>('http://localhost:3000/api/v1/recipes/count').pipe(
      pluck('totalElements')
    );
  }

  getRecipes(page ?: number, pageSize ?: number): Observable<RecipePagedResponse> {
    return this.http.get<RecipePagedResponse>('http://localhost:3000/api/v1/recipes', {
      params: this.pageUtils.handlePageParams(page, pageSize)
    });
  }

  searchRecipes(query: string, page ?: number, pageSize ?: number): Observable<RecipePagedResponse> {
    let parms: HttpParams = this.pageUtils.handlePageParams(page, pageSize);
    if (query && query.trim().length > 0) {
      parms = parms.set('q', query);
    }
    return this.http.get<RecipePagedResponse>('http://localhost:3000/api/v1/recipes', {
      params: parms
    });
  }
}
