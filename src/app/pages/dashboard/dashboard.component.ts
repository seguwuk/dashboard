import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart1: Chart;

  constructor() { }

  ngOnInit() {
    this.geraGrafico();
  }

  geraGrafico() {
    this.chart1 = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ""
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: ""
        },
  
      },
      xAxis: {
        title: {
          text: ""
        },
        categories: [
          'Compra',
          'Venda']
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          type: 'column',
          name: "Extrato",
          data: [5, 2]
        }
      ]


    })

  }



}
