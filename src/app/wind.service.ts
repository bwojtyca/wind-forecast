import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";

@Injectable()
export class WindService {

  constructor(private _http: Http) {
  }

  /**
   * @description Returns random number between "min" and "max"
   *
   * @param min
   * @param max
   * @returns {any}
   */
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * @description Generate forecast objects (mostly randomly - date may be the exception)
   *
   * @param [date]
   * @returns {Array}
   */
  generateForecast(date) {
    let power = this.getRandomArbitrary(10, 35);
    return {
      _id: Math.random().toString(36).substring(7),
      date: date || new Date().toISOString(),
      power: {
        mw: power * 380.005,
        utilization: power,
        capacity: 38000.5
      }
    }
  }

  /**
   * @description Return array of forecast objects
   *
   * @param hours
   * @returns {Array}
   */
  getRandomForecast(hours) {
    let forecast = [];
    let now = new Date(new Date(new Date().setSeconds(0)).setMinutes(0));

    for (let i = 0; i < hours; ++i) {
      forecast.push(this.generateForecast(new Date(new Date(now).setHours(now.getHours() + i)).toISOString()))
    }

    return forecast
  }

  getForecast() {
    return this._http.get('data/forecast/wind.json')
      .map((res: Response) => {
        return res.json() || [];
      })
      .catch((error: Response | any) => {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      });
  }
}
