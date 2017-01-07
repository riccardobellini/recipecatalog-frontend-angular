import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RecipeCatalogComponent } from './recipe-catalog.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    RecipeCatalogComponent,
    HeaderComponent,
    HomeComponent
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
