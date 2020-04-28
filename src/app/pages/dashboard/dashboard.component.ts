import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ExtratosService } from 'src/app/shared/extratos.service';
import { NgxSpinnerService } from "ngx-spinner";
import toastr from "toastr";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page: any;
  vendas: number;
  compras: number = 0;
  com: number = 0;
  vendasTotal: number = 0;
  comprasTotal: number = 0;
  chartTrancoes: Chart;
  chartValores: Chart;

  constructor(
    private service: ExtratosService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getExtrato();
  }


  getExtrato() {
    this.spinner.show();
    this.vendas = 0
    this.compras = 0
    this.comprasTotal = 0
    this.vendasTotal = 0

    this.service.getData().subscribe(success => {
      // 
      let tempReturn = [success]
      this.page = []
      tempReturn.forEach(i => {
        Object.values(i).forEach(element => {
          this.page.push(element)
        });
      });
      this.page.forEach(element => {
        if (element.tipo === "Venda") {
          this.vendas++
          this.vendasTotal = this.vendasTotal + parseInt(element.valor, 10)
        }
        if (element.tipo === "Compra") {
          this.compras++
          this.comprasTotal = this.comprasTotal + parseInt(element.valor, 10)
        }
      });
      this.geraGrafico();
    },
      err => {
        this.spinner.hide();
        toastr.error('Erro ao recuperar dados. Por favor, tente novamente.')

      }
    )
  }

  geraGrafico() {
    this.chartTrancoes = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: "Número de Transações"
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
          'Venda',
          'Compra',
        ]
      },


      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          }
        }
      },

      series: [
        {
          name: "Compras",
          type: "column",
          data: [this.compras]
        },
        {
          name: "Vendas",
          type: "column",
          data: [this.vendas]
        },
      ]
    })


    this.chartValores = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: "Valor de Tipos de Transações (Compra x Venda)"
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },

      series: [
        {
          name: "Tipos de Transação",
          type: 'pie',
          data: [{
            name: "Compras",
            y: this.comprasTotal
          },
          {
            name: "Vendas",
            y: this.vendasTotal
          }]
        }
      ]


    })


        this.spinner.hide();
  
  }



}
