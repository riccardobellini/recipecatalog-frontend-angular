import { Component } from '@angular/core';

@Component({
  selector: 'recipe-catalog-root',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.scss']
})
export class RecipeCatalogComponent {
  isSidenavOpen: boolean = true;
  openSidenav($event): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    console.log('navOpen', $event);
  }
}
