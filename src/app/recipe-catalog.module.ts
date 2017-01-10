import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RecipeCatalogComponent } from './recipe-catalog.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { RoutingModule } from './routing.module';
import { DishTypeListComponent } from './dish-type-list/dish-type-list.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    RecipeCatalogComponent,
    HeaderComponent,
    HomeComponent,
    DishTypeListComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [RecipeCatalogComponent]
})
export class RecipeCatalogModule { }
