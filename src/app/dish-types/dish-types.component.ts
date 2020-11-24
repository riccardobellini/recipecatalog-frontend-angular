import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DishTypeService } from 'app/dish-type.service';
import { DishTypesDataSource } from './dish-types-datasource';
import { DishTypeItem } from "../dish-type";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dish-types',
  templateUrl: './dish-types.component.html',
  styleUrls: ['./dish-types.component.scss']
})
export class DishTypesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DishTypeItem>;
  dataSource: DishTypesDataSource;

  filterInput: FormControl;

  constructor(private dtService: DishTypeService) {
    this.filterInput = new FormControl('');
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new DishTypesDataSource(this.dtService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
