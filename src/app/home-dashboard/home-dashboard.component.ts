import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DishTypeService } from 'app/dish-type.service';

interface CountCard {
  id: number,
  title: string,
  subtext: string,
  total?: number
};

@Component({
  selector: 'home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  countCards: CountCard[] = [
    {
      id: 1,
      title: 'Recipes',
      subtext: 'total recipes'
    },
    {
      id: 2,
      title: 'Dish Types',
      subtext: 'total dish types'
    },
    {
      id: 3,
      title: 'Ingredients',
      subtext: 'total ingredients'
    },
    {
      id: 4,
      title: 'Books',
      subtext: 'total books'
    }
  ]

  countCardDict = {
    recipes: 0,
    dishtypes: 1,
    ingredients: 2,
    books: 3
  };

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          countCard: { cols: 1, rows: 1 },
          chartCard: { cols: 1, rows: 2 },
        }
      }
      return {
        columns: 4,
        countCard: { cols: 1, rows: 1 },
        chartCard: { cols: 2, rows: 2 }
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dtService: DishTypeService) {}

  ngOnInit() {
    this.dtService.getDishTypeCount()
    .subscribe(total => {
      this.countCards[this.countCardDict.dishtypes].total = total;
    });
  }
}
