import {Injectable} from '@angular/core';

@Injectable()
export class LineChartService {

  constructor() {
  }

  /**
   *
   * @param forecast
   */
  prepareData(forecast) {
    let data = [{
      values: [],
      key: "Wind Power"
    }, {
      values: [],
      key: "Wind Power Capacity"
    }];

    forecast.forEach((entry, i) => {
      data[0].values.push({
        i: i,
        v: entry.power.mw,
        d: entry.date
      });
      data[1].values.push({
        i: i,
        v: entry.power.capacity,
        d: entry.date
      });
    })﻿

    return data;
  };
}
