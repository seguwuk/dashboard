import { ExtratosService } from './shared/extratos.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TransacoesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    ChartModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxCurrencyModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ExtratosService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
