import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishTypesComponent } from './dish-types/dish-types.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeDashboardComponent},
  { path: 'dishTypes', component: DishTypesComponent},
  { path: 'ingredients', component: IngredientsComponent }
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule],
  providers : []
})
export class RoutingModule{}
