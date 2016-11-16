/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LineChartService } from './line-chart.service';

describe('LineChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineChartService]
    });
  });

  it('should ...', inject([LineChartService], (service: LineChartService) => {
    expect(service).toBeTruthy();
  }));
});
