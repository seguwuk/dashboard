import { ExtratosService } from './../../shared/extratos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {
  
  formExtrato: FormGroup;
  page: any;

  constructor(
    private service: ExtratosService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
    this.getExtrato();
  }



  getExtrato() {
    this.service.getData().subscribe(success => {
      this.page = success
      console.log(success)
      this.setForm();
    },
      err => {
        console.log(err)
      }
    )
  }

  initForm() {
    this.formExtrato = this.formBuilder.group({
      tipo: '',
      nome: '',
      valor: '',
    })
  }

  setForm() {
    console.log(this.page)
    this.formExtrato.patchValue({
      tipo : this.page.tipo,
      nome: this.page.nome,
      valor: this.page.valor
    })

    console.log(this.formExtrato)






  }


}
