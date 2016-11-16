import { Injectable } from '@angular/core';

@Injectable()
export class TableChartService {

  constructor() { }

  /**
   * @param forecast
   */
  calculateUtilizationData(forecast) {
    forecast.forEach((entry) => {
      if (!entry.data) entry.data = {utilization: []};
      let data = [
        {
          key: "Utilization",
          value: entry.power.utilization
        },
        {
          key: "Reserve",
          value: 100 - entry.power.utilization
        }
      ];
      entry.data.utilization.push(...data);
    })
  }
}
