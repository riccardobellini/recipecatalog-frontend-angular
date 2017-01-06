import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RecipeCatalogComponent } from './recipe-catalog.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    RecipeCatalogComponent,
    HeaderComponent
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
