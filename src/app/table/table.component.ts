import {Component, OnInit, Input} from '@angular/core';
import {TableChartService} from "./table-chart.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input('data') forecast: any[]

  options = {
    chart: {
      type: 'pieChart',
      height: 40,
      width: 40,
      x: function (d) {
        return d.key;
      },
      y: function (d) {
        return d.value;
      },
      showLabels: false,
      showLegend: false,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      margin : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  };
  data;

  constructor(private _chartService: TableChartService) {
  }

  ngOnInit() {
    this._chartService.calculateUtilizationData(this.forecast);
  }

}
