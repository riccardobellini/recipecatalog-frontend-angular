
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { PaginationRequestInfo, PaginationRequestParams } from './models/pagination';

import 'rxjs/Rx';
import {DishType} from './dish-type';

@Injectable()
export class DishTypeService {

  constructor(private http: HttpClient) { }

  getDishTypes(page ?: number) {
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
      params: this.handlePageParams(page)
    });
  }

  searchDishTypes(query: string, page ?: number) {
    let parms: HttpParams = this.handlePageParams(page);
    if (query && query.trim().length > 0) {
      parms.set('q', query);
    }
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
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

  private handlePageParams(page?: number): HttpParams {
    let result: HttpParams = new HttpParams();
    let p: PaginationRequestParams;
    if (page) {
      p = PaginationRequestInfo.getPageRequestParams(page);
    } else {
      p = PaginationRequestInfo.getPageRequestParams(0);
    }
    result.set('offset', p.offset);
    result.set('limit', p.limit);
    return result;
  }

}
