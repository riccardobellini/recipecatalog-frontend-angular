import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishTypesComponent } from './dish-types/dish-types.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeDashboardComponent},
  { path: 'dishTypes', component: DishTypesComponent}
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule],
  providers : []
})
export class RoutingModule{}
