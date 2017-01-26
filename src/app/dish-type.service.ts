import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { PaginationRequestInfo, PaginationRequestParams } from './models/pagination';

import 'rxjs/Rx';

@Injectable()
export class DishTypeService {

  constructor(private http : Http) {}

  getDishTypes(page ?: number) {
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
      search : this.handlePageParams(page)
    })
    .map((response) => response.json());
  }

  searchDishTypes(query: string, page ?: number) {
    var parms : URLSearchParams = this.handlePageParams(page);
    if (query && query.trim().length > 0) {
      parms.set('q', query);
    }
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
      search : parms
    })
    .map((response) => response.json());
  }

  private handlePageParams(page ?: number) : URLSearchParams {
    var result : URLSearchParams = new URLSearchParams();
    var p : PaginationRequestParams;
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
