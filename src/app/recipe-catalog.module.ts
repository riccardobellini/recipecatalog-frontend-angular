import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RecipeCatalogComponent } from './recipe-catalog.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { RoutingModule } from './routing.module';
import { DishTypeListComponent } from './dish-type-list/dish-type-list.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { DishTypeService } from './dish-type.service';
import { NoHrefDirective } from './no-href.directive';
import { NewDishTypeComponent } from './new-dish-type/new-dish-type.component';

@NgModule({
  declarations: [
    RecipeCatalogComponent,
    HeaderComponent,
    HomeComponent,
    DishTypeListComponent,
    SpinnerComponent,
    NoHrefDirective,
    NewDishTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    DishTypeService
  ],
  bootstrap: [RecipeCatalogComponent]
})
export class RecipeCatalogModule { }
