import { RecipesDataSource } from './recipe-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { RecipeItem } from 'app/recipe-item';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RecipePagedResponse, RecipeService } from 'app/recipe.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rc-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<RecipeItem>;

  dataSource: RecipesDataSource;

  filterInput: FormControl;

  private _unsubscribeAll: Subject<any>;

  totalElements: number;
  loading = false;

  private _recipes$: BehaviorSubject<RecipeItem[]>;

  private get recipes$() {
    return this._recipes$.asObservable();
  }

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) {
    this._recipes$ = new BehaviorSubject([]);
    this.filterInput = new FormControl('');

    this._unsubscribeAll = new Subject();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'creationTime', 'lastModificationTime', 'actions'];

  private fetchRecipesList = () => {
    const filter = this.filterInput.value;
    this.recipeService.searchRecipes(filter, this.paginator.pageIndex, this.paginator.pageSize).pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(resp => {
      this.updateRecipes(resp);
      this.loading = false;
    });
  }

  private updateRecipes = (resp: RecipePagedResponse) => {
    this.totalElements = resp.totalElements;
    this._recipes$.next(resp.content);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.paginator.page.pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(_ => this.fetchRecipesList());

    this.fetchRecipesList();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataSource = new RecipesDataSource(this.recipes$);
    this.filterInput.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.paginator.firstPage();
      this.fetchRecipesList();
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium]).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(
      result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.displayedColumns = ['title', 'actions'];
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.displayedColumns = ['title', 'creationTime', 'actions'];
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedColumns = ['title', 'creationTime', 'lastModificationTime', 'actions'];
        } else {
          this.displayedColumns = ['id', 'title', 'creationTime', 'lastModificationTime', 'actions'];
        }
      }
    )
  }

  deleteRecipe = (recipe: RecipeItem) => {
    console.log(`Deleting recipe ${recipe.id}`);
  }

  editRecipe = (recipe: RecipeItem) => {
    console.log(`Editing recipe ${recipe.id}`);
  }

  addRecipe = () => {
    console.log('Adding recipe');
  }

}
