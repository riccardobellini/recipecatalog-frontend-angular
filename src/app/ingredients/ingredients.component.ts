import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AddEditIngredientComponent } from 'app/add-edit-ingredient/add-edit-ingredient.component';
import { Ingredient, IngredientEdit, IngredientItem } from 'app/ingredient';
import { IngredientPagedResponse, IngredientService } from 'app/ingredient.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { IngredientsDataSource } from "./ingredients-datasource";

@Component({
  selector: 'rc-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<IngredientItem>;

  dataSource: IngredientsDataSource;

  filterInput: FormControl;

  private _unsubscribeAll: Subject<any>;

  totalElements: number;
  loading = false;

  private _ingredients$: BehaviorSubject<IngredientItem[]>;

  private get ingredients$() {
    return this._ingredients$.asObservable();
  }

  constructor(
    private ingrService: IngredientService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) {
    this._ingredients$ = new BehaviorSubject([]);
    this.filterInput = new FormControl('');

    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'creationTime', 'lastModificationTime', 'actions'];

  private fetchIngredientList = () => {
    const filter = this.filterInput.value;
    this.ingrService.searchIngredients(filter, this.paginator.pageIndex, this.paginator.pageSize).pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(resp => {
      this.updateIngredients(resp);
      this.loading = false;
    });
  }

  private updateIngredients = (resp: IngredientPagedResponse) => {
    this.totalElements = resp.totalElements;
    this._ingredients$.next(resp.content);
  }

  ngOnInit() {
    this.loading = true;
    this.dataSource = new IngredientsDataSource(this.ingredients$);
    this.filterInput.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.paginator.firstPage();
      this.fetchIngredientList();
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium]).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(
      result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.displayedColumns = ['name', 'actions'];
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.displayedColumns = ['name', 'creationTime', 'actions'];
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedColumns = ['name', 'creationTime', 'lastModificationTime', 'actions'];
        } else {
          this.displayedColumns = ['id', 'name', 'creationTime', 'lastModificationTime', 'actions'];
        }
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.paginator.page.pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(_ => this.fetchIngredientList());

    this.fetchIngredientList();
  }

  deleteIngredient = (ingr: IngredientItem) => {
    console.log(`Deleting ${ingr.id}`);
  }

  editIngredient = (ingr: IngredientItem) => {
    console.log(`Editing ${ingr.id}`);
  }

  addIngredient = () => {
    const dialog = this.dialog.open<AddEditIngredientComponent, any, IngredientEdit>(AddEditIngredientComponent);

    dialog.afterClosed().subscribe(
      result => {
        if (result && result.name) {
          this.loading = true;
          this.ingrService.createIngredient(result).subscribe(this.fetchIngredientList);
        }
      }
    );
  }

}
