/* tslint:disable:no-unused-variable */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import 'nvd3';
import {nvD3} from "ng2-nvd3";

import {TableComponent} from './table.component';
import {TableChartService} from "./table-chart.service";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let element;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
        nvD3
      ],
      providers: [
        TableChartService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    component.forecast = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(element.querySelectorAll('tr').length).toBe(1);
  });

  it('should build table with 2 rows and header', () => {
    component.forecast = [
      {
        "_id": "aa7shrqgvq0qsrkmiy66r",
        "date": "2016-11-16T11:00:00.551Z",
        "power": {
          "mw": 7926.751456047034,
          "utilization": 20.85959778436345,
          "capacity": 38000.5
        }
      },
      {
        "_id": "hruypj6g4dech257b9",
        "date": "2016-11-16T12:00:00.551Z",
        "power": {
          "mw": 12948.236535254035,
          "utilization": 34.07385833147994,
          "capacity": 38000.5
        }
      }];
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(element.querySelectorAll('tr').length).toBe(3);
  });
});
