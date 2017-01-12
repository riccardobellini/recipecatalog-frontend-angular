import { Component, OnInit } from '@angular/core';

import { DishTypeService } from '../dish-type.service';

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

  private numSelected: number = 0;
  private requestRunning: boolean = false;

  dishTypes: Array<DishType> = [
    {
      id: 1,
      name: 'Antipasti',
      selected: false
    },
    {
      id: 2,
      name: 'Primi Piatti - Riso',
      selected: false
    },
    {
      id: 3,
      name: 'Secondi Piatti - Carne',
      selected: false
    }
  ];

  constructor(private dtSrv : DishTypeService) {
    dtSrv.getDishTypes()
    .subscribe((dishTypes) => console.log(dishTypes));
  }

  ngOnInit() {
  }

  requestCompleted() {
    this.requestRunning = false;
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

}
