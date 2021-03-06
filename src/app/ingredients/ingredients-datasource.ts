import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';

import { IngredientItem } from "../ingredient";


/**
 * Data source for the Ingredients view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class IngredientsDataSource extends DataSource<IngredientItem> {
  paginator: MatPaginator;
  sort: MatSort;


  constructor(private ingredients$: Observable<IngredientItem[]>) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IngredientItem[]> {
    return this.ingredients$;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

}
