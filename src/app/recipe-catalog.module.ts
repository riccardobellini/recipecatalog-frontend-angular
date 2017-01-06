import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RecipeCatalogComponent } from './recipe-catalog.component';

@NgModule({
  declarations: [
    RecipeCatalogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [RecipeCatalogComponent]
})
export class RecipeCatalogModule { }
