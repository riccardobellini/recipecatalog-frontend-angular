import { Component, OnInit } from '@angular/core';

export interface DishType {
  id: number;
  name: string;
}

@Component({
  selector: 'rc-dish-type-list',
  templateUrl: './dish-type-list.component.html',
  styleUrls: ['./dish-type-list.component.scss']
})
export class DishTypeListComponent implements OnInit {

  private requestRunning: boolean = false;

  dishTypes: Array<DishType> = [
    {
      id: 1,
      name: 'Antipasti'
    },
    {
      id: 2,
      name: 'Primi Piatti - Riso'
    },
    {
      id: 3,
      name: 'Secondi Piatti - Carne'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  requestCompleted() {
    this.requestRunning = false;
  }

}
