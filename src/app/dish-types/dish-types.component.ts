import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DishTypePagedResponse, DishTypeService } from 'app/dish-type.service';
import { DishTypesDataSource } from './dish-types-datasource';
import { DishType, DishTypeItem } from "../dish-type";
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDishTypeComponent, DishTypeDialogData } from 'app/add-edit-dish-type/add-edit-dish-type.component';
import { DeleteDishTypeConfirmComponent } from 'app/delete-dish-type-confirm/delete-dish-type-confirm.component';

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

  private _unsubscribeAll: Subject<any>;

  totalElements: number;
  loading = false;

  private _dishTypes$: BehaviorSubject<DishTypeItem[]>;

  private get dishTypes$() {
    return this._dishTypes$.asObservable();
  }

  constructor(private dtService: DishTypeService, private dialog: MatDialog) {
    this._dishTypes$ = new BehaviorSubject([]);
    this.filterInput = new FormControl('');

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
    this.loading = true;
    this.dataSource = new DishTypesDataSource(this.dishTypes$);
    this.filterInput.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.paginator.firstPage();
      this.fetchDishTypeList();
    });
  }

  deleteDishType = (dt: DishTypeItem) => {
    const dialog = this.dialog.open<DeleteDishTypeConfirmComponent, string, boolean>(DeleteDishTypeConfirmComponent, {
      data: dt.name
    });

    dialog.afterClosed().subscribe(
      doDelete => {
        if (doDelete === true) {
          this.loading = true;
          this.dtService.deleteDishType(dt).subscribe(this.fetchDishTypeList);
        }
      }
    );
  }

  editDishType(dt: DishTypeItem) {
    const dialog = this.dialog.open<AddEditDishTypeComponent, DishTypeDialogData, DishType>(AddEditDishTypeComponent, {
      data: {
        action: 'edit',
        data: { ...dt }
      }
    });

    dialog.afterClosed().subscribe(
      result => {
        if (result && typeof result.id !== 'undefined' && result.name) {
          this.loading = true;
          this.dtService.editDishType(result).subscribe(this.fetchDishTypeList);
        }
      }
    );
  }

  addDishType = () => {
    const dialog = this.dialog.open<AddEditDishTypeComponent, any, DishType>(AddEditDishTypeComponent);

    dialog.afterClosed().subscribe(
      result => {
        if (result && result.name) {
          this.loading = true;
          this.dtService.createDishType(result).subscribe(this.fetchDishTypeList);
        }
      }
    )
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.paginator.page.pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(_ => this.fetchDishTypeList());

    this.fetchDishTypeList();
  }

  updateDishTypes = (resp: DishTypePagedResponse) => {
    this.totalElements = resp.totalElements;
    this._dishTypes$.next(resp.content);
  }

  fetchDishTypeList = () => {
    const filter = this.filterInput.value;
    this.dtService.searchDishTypes(filter, this.paginator.pageIndex, this.paginator.pageSize).pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(resp => {
      this.updateDishTypes(resp);
      this.loading = false;
    });
  }
}
