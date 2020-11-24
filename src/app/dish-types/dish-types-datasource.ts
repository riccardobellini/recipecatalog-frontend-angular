import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { DishTypeService } from 'app/dish-type.service';

import { DishTypeItem } from "../dish-type";



/**
 * Data source for the DishTypes view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DishTypesDataSource extends DataSource<DishTypeItem> {
  paginator: MatPaginator;
  sort: MatSort;

  totalElements: number;

  constructor(private dtService: DishTypeService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DishTypeItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));

    const initialData$ = this.dtService.getDishTypes(this.paginator.pageIndex, this.paginator.pageSize).pipe(
      switchMap((resp) => {
        this.totalElements = resp.totalElements;
        return of(resp.content);
      })
    );
    const pageChanges$ = this.paginator.page.pipe(
      switchMap(page => {
        return this.dtService.getDishTypes(page.pageIndex, page.pageSize);
      }),
      switchMap((resp) => {
        this.totalElements = resp.totalElements;
        return of(resp.content);
      })
    );

    const dataMutations = [
      initialData$,
      pageChanges$
    ];

    return merge(...dataMutations).pipe(
      map(dishTypes => dishTypes.map(dt => ({
        id: dt.id,
        name: dt.name
      })))
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

}
