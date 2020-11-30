import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { PaginationRequestParams } from './models/pagination';


@Injectable({
  providedIn: 'root'
})
export class PageUtilsService {

  constructor() { }

  handlePageParams(page?: number, pageSize?: number): HttpParams {
    const result: HttpParams = new HttpParams();
    const p: PaginationRequestParams = {
      page,
      size: pageSize
    };
    return result.set('page', p.page.toString()).set('size', p.size.toString());
  }
}
