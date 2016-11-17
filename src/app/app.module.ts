import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

// external module for charts
import {nvD3} from "ng2-nvd3";
declare let d3;

// main service
import {WindService} from "./wind.service";

// components
import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {LineComponent} from './line/line.component';

// components' services
import {TableChartService} from "./table/table-chart.service";
import {LineChartService} from "./line/line-chart.service";

@NgModule({
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
  providers: [WindService, TableChartService, LineChartService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
