import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptionsArgs} from '@angular/http';

import { PaginationRequestInfo, PaginationRequestParams } from './models/pagination';

import 'rxjs/Rx';
import {DishType} from './dish-type';

@Injectable()
export class DishTypeService {

  headers: Headers = new Headers({ 'Content-Type': 'application/json'});
  // options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {}

  getDishTypes(page ?: number) {
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
      search : this.handlePageParams(page)
    })
    .map((response) => response.json());
  }

  searchDishTypes(query: string, page ?: number) {
    let parms: URLSearchParams = this.handlePageParams(page);
    if (query && query.trim().length > 0) {
      parms.set('q', query);
    }
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
      search : parms
    })
    .map((response) => response.json());
  }
  createDishType(dt: DishType) {
    let options: RequestOptionsArgs = {headers: this.headers};
    return this.http.post('http://localhost:3000/api/v1/dishTypes', dt, options)
      .map(response => response.status);
  }
  editDishType(dt: DishType) {
    let options: RequestOptionsArgs = {headers: this.headers};
    let url = `http://localhost:3000/api/v1/dishTypes/${dt.id}`;
    let submit: DishType = {
      name: dt.name
    };
    return this.http.put(url, submit, options)
      .map(response => response.status);;
  }

  private handlePageParams(page ?: number): URLSearchParams {
    let result: URLSearchParams = new URLSearchParams();
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
