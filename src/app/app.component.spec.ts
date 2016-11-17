/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TableComponent} from "./table/table.component";
import 'nvd3';
import {nvD3} from "ng2-nvd3";
import {LineComponent} from "./line/line.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {WindService} from "./wind.service";

describe('AppComponent', () => {
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
      providers: [WindService]
    });
  });

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



});
