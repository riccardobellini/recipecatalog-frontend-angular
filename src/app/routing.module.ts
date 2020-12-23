import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';

import { DishTypesComponent } from './dish-types/dish-types.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeDashboardComponent},
  { path: 'recipes', component: RecipeListComponent},
  { path: 'dishTypes', component: DishTypesComponent},
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'books', component: BooksComponent }
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule],
  providers : []
})
export class RoutingModule{}
