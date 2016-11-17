/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {WindService} from './wind.service';
import {BaseRequestOptions, ResponseOptions, Response, Http, RequestMethod} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

describe('WindService', () => {
  let backend: MockBackend;
  let windService: WindService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });


  beforeEach(inject([MockBackend, WindService], (_backend, _windService) => {
    backend = _backend;
    windService = _windService;
  }));

  it('should ...', inject([WindService], (service: WindService) => {
    expect(service).toBeTruthy();
  }));


  it('should download empty array', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify([])
      })))
    });

    windService.getForecast().subscribe((forecast) => {
      expect(forecast).toBeDefined();
      expect(forecast.length).toBe(0);
    });
  });

  it('should download array with 2 elements', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toBe("data/forecast/wind.json");

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify([{
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
          }])
      })))
    });

    windService.getForecast().subscribe((forecast) => {
      expect(forecast).toBeDefined();
      expect(forecast.length).toBe(2);
      expect(forecast[0]._id).toBe("aa7shrqgvq0qsrkmiy66r");
      expect(forecast[1]._id).toBe("hruypj6g4dech257b9");
    });
  });
});
