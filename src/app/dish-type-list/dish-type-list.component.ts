import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DishTypeService } from '../dish-type.service';

import { PaginationResponseInfo } from '../models/pagination';

export interface DishType {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'rc-dish-type-list',
  templateUrl: './dish-type-list.component.html',
  styleUrls: ['./dish-type-list.component.scss']
})
export class DishTypeListComponent implements OnInit {

  private numSelected : number = 0;
  private requestRunning : boolean = false;
  private currPage : number = 0;

  dtFilter : FormControl = new FormControl();

  dishTypes: Array<DishType> = [];
  paging: PaginationResponseInfo;

  constructor(private dtSrv : DishTypeService) {
    this.requestStarted();
    dtSrv.getDishTypes()
    .subscribe((resp) => {
      this.paging = {
        elCount : resp.pagination.total,
        pages : Array(resp.pagination.pageCount).fill(0).map((x, i) => i),
        more : resp.pagination.hasMore
      };
      this.dishTypes = resp.results;
      this.requestCompleted();
    });
  }

  ngOnInit() {
    this.dtFilter.valueChanges
    .debounceTime(500)
    .subscribe((term) => console.log(term));
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

  goToPage(page : number) {
    this.currPage = page;
    this.requestStarted();
    this.dtSrv.getDishTypes(this.currPage)
    .subscribe((resp) => {
      this.dishTypes = resp.results;
      this.requestCompleted();
    });
  }

}
