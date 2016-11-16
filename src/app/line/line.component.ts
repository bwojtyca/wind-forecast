import {Component, OnInit, Input} from '@angular/core';
import {LineChartService} from "./line-chart.service";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  @Input('data') forecast: any[];

  chartData: any[];
  options = {
    chart: {
      forceY: [0,40000],
      type: 'lineChart',
      height: 350,
      margin : {
        top: 20,
        right: 20,
        bottom: 40,
        left: 100
      },
      x: function(d){ return d.i; },
      y: function(d){ return d.v; },
      useInteractiveGuideline: true,
      xAxis: {
        tickFormat: (index) => { return d3.time.format('%b %d, %I %p')(new Date(this.forecast[index].date)) }
      },
      yAxis: {
        axisLabel: 'MW',
      }
    }
  };

  constructor(private _chartService: LineChartService) {
  }

  ngOnInit() {
    this.chartData = this._chartService.prepareData(this.forecast);
  }

}
