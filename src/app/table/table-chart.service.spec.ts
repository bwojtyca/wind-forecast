/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TableChartService } from './table-chart.service';

describe('TableChartService', () => {
  let chartService: TableChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableChartService]
    });

    chartService = new TableChartService();
  });

  it('should works ;)', inject([TableChartService], (service: TableChartService) => {
    expect(service).toBeTruthy();
  }));


  it('should calculate data', () => {
    let forecast: any[] = [{
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
      },
      {
        "_id": "od1cmn7nieqt3p48zd7vi",
        "date": "2016-11-16T13:00:00.551Z",
        "power": {
          "mw": 6331.037869385885,
          "utilization": 16.660406756189747,
          "capacity": 38000.5
        }
      }];

    chartService.calculateUtilizationData(forecast);
    forecast.forEach((entry) => {
      expect(entry.data).toBeDefined();
      expect(entry.data.utilization).toBeDefined();
      expect(entry.data.utilization.length).toBe(2);
      expect(entry.data.utilization[0].key).toBe('Utilization');
      expect(entry.data.utilization[0].value).toBe(entry.power.utilization);
      expect(entry.data.utilization[1].key).toBe('Reserve');
      expect(entry.data.utilization[1].value).toBe(100-entry.power.utilization);
    })
  })
});
