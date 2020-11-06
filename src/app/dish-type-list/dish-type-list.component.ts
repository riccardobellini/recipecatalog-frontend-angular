
import { switchMap, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DishTypeService } from '../dish-type.service';

import { PaginationResponseInfo } from '../models/pagination';

import { Subscription, Observable } from 'rxjs';
import {DishType} from '../dish-type';

export interface DishTypeIntf {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'rc-dish-type-list',
  templateUrl: './dish-type-list.component.html',
  styleUrls: ['./dish-type-list.component.scss']
})
export class DishTypeListComponent implements OnInit, OnDestroy {

  private numSelected = 0;
  requestRunning = false;
  private currPage = 0;
  selectedDT: DishType = new DishType();
  dtFilter: FormControl = new FormControl();

  dishTypes: Array<DishTypeIntf> = [];
  paging: PaginationResponseInfo;

  creationMode = false;
  editingMode = false;

  private subscription: Subscription;


  constructor(private dtSrv: DishTypeService) {
    this.initDishTypes();
  }

  private initDishTypes() {
    this.requestStarted();
    this.dtSrv.getDishTypes()
      .subscribe((resp) => {
        this.handleServiceResponse(resp);
        this.requestCompleted();
      });
  }

  ngOnInit() {
    this.handleFilterChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleServiceResponse(resp) {
    this.paging = {
      elCount: resp.totalElements,
      pages: Array(resp.totalPages).fill(0).map((x, i) => i),
      more: !resp.last
    };
    this.dishTypes = resp.content;
  }

  private handleFilterChange() {
    this.requestStarted();
    this.subscription = this.dtFilter.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((term) => this.dtSrv.searchDishTypes(term)),)
    .subscribe((resp) => {
      // reset page
      this.currPage = 0;
      this.handleServiceResponse(resp);
      this.requestCompleted();
    });
  }

  private requestCompleted() {
    this.requestRunning = false;
  }

  private requestStarted() {
    this.requestRunning = true;
  }

  toggleAll($event) {
    this.dishTypes.forEach((dt) => {
      dt.selected = $event.target.checked;
    });
    if ($event.target.checked) {
      this.numSelected = this.dishTypes.length;
    } else {
      this.numSelected = 0;
    }
  }

  previousPage() {
    this.goToPage(this.currPage - 1);
  }

  nextPage() {
    this.goToPage(this.currPage + 1);
  }

  goToPage(page: number) {
    this.currPage = page;
    let worker: Observable<any>;
    if (this.dtFilter.value && this.dtFilter.value.trim().length > 0) {
      worker = this.dtSrv.searchDishTypes(this.dtFilter.value, this.currPage);
    } else {
      worker = this.dtSrv.getDishTypes(this.currPage);
    }
    this.requestStarted();
    worker.subscribe((resp) => {
      this.dishTypes = resp.content;
      this.requestCompleted();
    });
  }
  handleHideCreation($event) {
    if ($event) {
      this.initDishTypes();
    }
    this.creationMode = false;
    this.editingMode = false;
  }
  editDishType(elem: DishTypeIntf) {
    this.editingMode = true;
    this.selectedDT = {
      id: elem.id,
      name: elem.name
    };
  }

  deleteDishType(dt: DishTypeIntf) {
    // TODO show modal confirmation
    this.requestStarted();
    this.dtSrv.deleteDishType(dt).pipe(
      switchMap(_ => this.dtSrv.getDishTypes()),
      catchError(_ => this.dtSrv.getDishTypes())
    ).subscribe((resp) => {
      this.handleServiceResponse(resp);
      this.requestCompleted();
    });
  }

}
