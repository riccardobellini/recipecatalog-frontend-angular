import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DishTypeService {

  constructor(private http : Http) {}

  getDishTypes() {
    return this.http.get('http://localhost:3000/api/v1/dishTypes')
    .map((response) => response.json());
  }

}
