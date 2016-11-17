/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TableComponent} from "./table/table.component";
import 'nvd3';
import {nvD3} from "ng2-nvd3";
import {LineComponent} from "./line/line.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {
  HttpModule, JsonpModule, BaseRequestOptions, Http, RequestMethod, Response,
  ResponseOptions
} from "@angular/http";
import {WindService} from "./wind.service";
import {MockBackend, MockConnection} from "@angular/http/testing";

describe('AppComponent', () => {
  let backend: MockBackend;
  let windService: WindService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TableComponent,
        nvD3,
        LineComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
      ],
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

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Wind forecast!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Wind forecast');
  }));

  it('should subscribe and receive 2 elements', () => {
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

    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.forecast.length).toBe(2);
    expect(component.forecast[0]._id).toBe("aa7shrqgvq0qsrkmiy66r");
    expect(component.forecast[1]._id).toBe("hruypj6g4dech257b9");
    expect(component.errorMessage).toBeUndefined();
  });

  it('should subscribe and receive an error string msg', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toBe("data/forecast/wind.json");

      connection.mockError(new Error('Something went wrong'))
    });

    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.forecast).toBeUndefined();
    expect(component.errorMessage).toBe('Something went wrong');
  });

  it('should subscribe and receive an error response msg', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toBe("data/forecast/wind.json");

      // added <any> to bypass mockError's requirement to use Error type parameter
      connection.mockError(<any>new Response(new ResponseOptions({
        body: JSON.stringify({
          error: 'Something went wrong'
        }),
        status: 404,
        statusText: 'Not found'
      })))
    });

    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.forecast).toBeUndefined();
    expect(component.errorMessage).toBe('404 - Not found Something went wrong');
  })
});
