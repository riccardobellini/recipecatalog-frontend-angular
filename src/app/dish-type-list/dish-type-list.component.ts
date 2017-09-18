import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DishTypeService } from '../dish-type.service';

import { PaginationResponseInfo } from '../models/pagination';

import { Subscription, Observable } from 'rxjs/Rx';
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
  private requestRunning = false;
  private currPage = 0;
  private selectedDT: DishType = new DishType();
  dtFilter: FormControl = new FormControl();

  dishTypes: Array<DishTypeIntf> = [];
  paging: PaginationResponseInfo;

  private creationMode = false;
  private editingMode = false;

  private subscription: Subscription;

  constructor(private dtSrv: DishTypeService, private modalService: NgbModal) {
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
      elCount : resp.pagination.total,
      pages : Array(resp.pagination.pageCount).fill(0).map((x, i) => i),
      more : resp.pagination.hasMore
    };
    this.dishTypes = resp.results;
  }

  private handleFilterChange() {
    this.requestStarted();
    this.subscription = this.dtFilter.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap((term) => this.dtSrv.searchDishTypes(term))
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
      this.dishTypes = resp.results;
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
  deleteDishType(id) {
    console.log(`Deleting category ${id}`);
    this.dtSrv.deleteDishType(id).subscribe(resp => {
      console.log(resp);
      this.initDishTypes();
    });
  }
  showDelete(content, dt: DishType) {
    this.selectedDT = dt;
    this.modalService.open(content).result.then((result) => {
      if (result) {
        this.deleteDishType(result);
      }
    });
  }
  showDeleteAll(content) {
    this.modalService.open(content).result.then((elem) => {
      if (elem) {
        let toDelete = elem.filter((el) => {
          return el && el.id && el.selected;
        }).map((el) => {
          if (el && el.selected && el.id) {
            return el.id;
          }
        });
        if (toDelete && toDelete.length > 0) {
          this.deleteDishTypes(toDelete);
        }
      }
    });
  }

  deleteDishTypes(ids) {
    console.log(`Deleting categories ${ids}`);
    this.dtSrv.deleteDishTypes(ids).subscribe(resp => {
      console.log(resp);
      this.initDishTypes();
    });
  }

}
