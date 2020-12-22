import { pluck } from 'rxjs/operators';
import { CountResponse } from './count-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipeCount(): Observable<number> {
    return this.http.get<CountResponse>('http://localhost:3000/api/v1/recipes/count').pipe(
      pluck('totalElements')
    );
  }
}
