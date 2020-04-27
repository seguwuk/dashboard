import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ExtratosService } from 'src/app/shared/extratos.service';


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
  ) { }

  ngOnInit() {
    this.getExtrato();
  }


  getExtrato() {
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
        console.log(element)
        if (element.tipo === "Venda") {
          this.vendas ++ 
          this.vendasTotal = this.vendasTotal + parseInt(element.valor, 10 )
          console.log('venda')
        }
        if (element.tipo === "Compra") {
          this.compras ++          
          this.comprasTotal =  this.comprasTotal + parseInt(element.valor, 10 )
          console.log(element.valor)
          console.log(this.comprasTotal)
          console.log('compra')
        }
      });
      console.log(this.vendas, this.compras)
      this.geraGrafico();

    },
      err => {
        console.log(err)
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

    series:[
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
      // series: [
      //   {
      //     name: "Tipos de Transação",
      //     type: 'column',
      //     data: [{
      //       name: "Compras",
      //       y: this.compras
      //     },
      //     {
      //       name: "Vendas",
      //       y: this.vendas
      //     }]
      //   }
      // ]
    })


    this.chartValores = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: "Totais de Transações (Compra x Venda)"
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
  }



}
