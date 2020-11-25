import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DishTypeService } from 'app/dish-type.service';
import { DishTypesDataSource } from './dish-types-datasource';
import { DishTypeItem } from "../dish-type";
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dish-types',
  templateUrl: './dish-types.component.html',
  styleUrls: ['./dish-types.component.scss']
})
export class DishTypesComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DishTypeItem>;
  dataSource: DishTypesDataSource;

  filterInput: FormControl;

  filterTextChanged: Subject<string>;

  private _unsubscribeAll: Subject<any>;

  constructor(private dtService: DishTypeService) {
    this.filterInput = new FormControl('');
    this.filterTextChanged = new Subject();

    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  ngOnInit() {
    this.dataSource = new DishTypesDataSource(this.dtService, this.filterTextChanged.asObservable());
    this.filterInput.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      const text = filter.trim();
      this.filterTextChanged.next(text);
    });
  }

  deleteDishType(dt: DishTypeItem) {
    console.log('Delete', dt);
  }

  editDishType(dt: DishTypeItem) {
    console.log('Edit', dt);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
