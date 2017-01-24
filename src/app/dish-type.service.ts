import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { PaginationRequestInfo, PaginationRequestParams } from './models/pagination';

import 'rxjs/Rx';

@Injectable()
export class DishTypeService {

  constructor(private http : Http) {}

  getDishTypes(page ?: number) {
    var params : URLSearchParams = new URLSearchParams();
    var p : PaginationRequestParams;
    if (page) {
      p = PaginationRequestInfo.getPageRequestParams(page);
    } else {
      p = PaginationRequestInfo.getPageRequestParams(0);
    }
    params.set('offset', p.offset);
    params.set('limit', p.limit);
    return this.http.get('http://localhost:3000/api/v1/dishTypes', {
      search : params
    })
    .map((response) => response.json());
  }

}
