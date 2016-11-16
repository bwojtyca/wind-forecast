/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableChartService } from './table-chart.service';

describe('TableChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableChartService]
    });
  });

  it('should ...', inject([TableChartService], (service: TableChartService) => {
    expect(service).toBeTruthy();
  }));
});
