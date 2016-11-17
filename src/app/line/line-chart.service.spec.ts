/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LineChartService } from './line-chart.service';

describe('LineChartService', () => {
  let chartService: LineChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineChartService]
    });
    chartService = new LineChartService();
  });

  it('should works ;)', inject([LineChartService], (service: LineChartService) => {
    expect(service).toBeTruthy();
  }));


  it('should prepare data for line chart', () => {
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

    let data = chartService.prepareData(forecast);
    data.forEach((entry, index) => {
      if(index == 0) {
        expect(entry.key).toBe('Wind Power');
        entry.values.forEach((entry, i) => {
          expect(entry.v).toBe(forecast[i].power.mw);
        });
      } else {
        expect(entry.key).toBe('Wind Power Capacity');
        entry.values.forEach((entry, i) => {
          expect(entry.v).toBe(forecast[i].power.capacity);
        });
      }
      entry.values.forEach((entry, i) => {
        expect(entry.i).toBe(i);
        expect(entry.d).toBe(forecast[i].date);
      });
    })
  })


});
