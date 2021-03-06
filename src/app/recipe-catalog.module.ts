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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IngredientService } from "./ingredient.service";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DishTypesComponent } from './dish-types/dish-types.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { AddEditDishTypeComponent } from './add-edit-dish-type/add-edit-dish-type.component';
import { DeleteDishTypeConfirmComponent } from './delete-dish-type-confirm/delete-dish-type-confirm.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AddEditIngredientComponent } from './add-edit-ingredient/add-edit-ingredient.component';
import { DeleteIngredientConfirmComponent } from './delete-ingredient-confirm/delete-ingredient-confirm.component';
import { BooksComponent } from './books/books.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { DeleteBookConfirmComponent } from './delete-book-confirm/delete-book-confirm.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    RecipeCatalogComponent,
    HeaderComponent,
    HomeComponent,
    DishTypeListComponent,
    SpinnerComponent,
    NoHrefDirective,
    NewDishTypeComponent,
    NavigationComponent,
    HomeDashboardComponent,
    DishTypesComponent,
    AddEditDishTypeComponent,
    DeleteDishTypeConfirmComponent,
    IngredientsComponent,
    AddEditIngredientComponent,
    DeleteIngredientConfirmComponent,
    BooksComponent,
    AddEditBookComponent,
    DeleteBookConfirmComponent,
    DashboardCardComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    FlexLayoutModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [RecipeCatalogComponent]
})
export class RecipeCatalogModule { }
