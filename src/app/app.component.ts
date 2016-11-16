import {Component, OnInit, Output} from '@angular/core';
import {WindService} from "./wind.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title:string = 'Wind forecast';
  errorMessage: any;
  @Output() forecast: any[];

  constructor(private _forecast: WindService) {
  }

  ngOnInit() {
    // this.forecast = this._forecast.getRandomForecast(100);
    this._forecast.getForecast().subscribe(
      forecast => this.forecast = forecast,
      error => this.errorMessage = error
    );
  }
}
