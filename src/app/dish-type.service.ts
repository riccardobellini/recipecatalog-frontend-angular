
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { PageUtilsService } from "./page-utils.service";

import 'rxjs/Rx';
import {DishType, DishTypeItem} from './dish-type';
import { Observable } from 'rxjs/Rx';

interface FullDishTypeItem extends DishTypeItem {
  creationTime: string,
  lastModificationTime: string
};

export interface DishTypePagedResponse {
  content: FullDishTypeItem[],
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

@Injectable()
export class DishTypeService {

  constructor(private http: HttpClient, private pageUtils: PageUtilsService) { }

  getDishTypes(page ?: number, pageSize ?: number): Observable<DishTypePagedResponse> {
    return this.http.get<DishTypePagedResponse>('http://localhost:3000/api/v1/dishTypes', {
      params: this.pageUtils.handlePageParams(page, pageSize)
    });
  }

  searchDishTypes(query: string, page ?: number, pageSize ?: number): Observable<DishTypePagedResponse> {
    let parms: HttpParams = this.pageUtils.handlePageParams(page, pageSize);
    if (query && query.trim().length > 0) {
      parms = parms.set('q', query);
    }
    return this.http.get<DishTypePagedResponse>('http://localhost:3000/api/v1/dishTypes', {
      params: parms
    });
  }
  createDishType(dt: DishType) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/api/v1/dishTypes', dt, {
      headers,
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }
  editDishType(dt: DishType) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url = `http://localhost:3000/api/v1/dishTypes/${dt.id}`;
    let submit: DishType = {
      name: dt.name
    };
    return this.http.put(url, submit, {
      headers,
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }

  deleteDishType(dt: DishType) {
    const url = `http://localhost:3000/api/v1/dishTypes/${dt.id}`;
    return this.http.delete(url, {
      observe: 'response'
    }).pipe(
      map(response => response.status)
    );
  }


}
