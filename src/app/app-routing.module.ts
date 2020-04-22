import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transacoes',
    pathMatch: 'full',
  },
  {
    path: 'transacoes',
    component: TransacoesComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
