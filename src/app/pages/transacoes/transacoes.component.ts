import { ExtratosService } from './../../shared/extratos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import toastr from "toastr";

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {

  formExtrato: FormGroup;
  page: any;
  idTransacao: any;
  dataId: { id: any; };

  constructor(
    private service: ExtratosService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.getExtrato();
  }



  getExtrato() {
    this.spinner.show();
    this.service.getData().subscribe(success => {
      // 
      let tempReturn = [success]
      this.page = []
      tempReturn.forEach(i => {
        Object.values(i).forEach(element => {
          this.page.push(element)
        });
      });
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        toastr.error('Erro ao recuperar dados. Por favor, tente novamente.')

      }
    )
  }

  onSubmit() {
    this.spinner.show();
    if (this.formExtrato.status === "INVALID") {
    }
    if (this.formExtrato.status === "VALID") {
      this.service.addData(this.formExtrato.value).subscribe(retunrid => {
        this.idTransacao = retunrid['name']
        this.dataId = {
          id: retunrid['name']
        }
        this.adicionaID()
        err => {
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
        toastr.error('Erro ao incluir transação.')
        console.log(err)
      }
      )
    }

  }


  adicionaID() {
    this.service.addId(this.idTransacao, this.dataId).subscribe(success => {
      toastr.success('Transação incluída com sucesso.')
      this.ngOnInit()
      this.spinner.hide();

    },
      err => {
        this.spinner.hide();
        toastr.error('Erro ao incluir transação.')
      })
  }


  excluirTransacao(id) {
    this.spinner.show();
    this.service.excludeId(id).subscribe(success => {

      this.spinner.hide();
      toastr.success('Transação excluída com sucesso.')

      this.getExtrato();
    },
      err => {
        this.spinner.hide();
        toastr.error('Erro ao excluir transação.')

      })
  }



  initForm() {
    this.formExtrato = this.formBuilder.group({
      id: '',
      // tipo: new FormControl('', Validators.required),
      // nome: new FormControl('', Validators.required),
      // valor: new FormControl('', Validators.required),
      tipo: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(4)]],
      valor: ['', Validators.required],
    })
  }

  setForm() {
    this.formExtrato.patchValue({
      tipo: this.page.tipo,
      nome: this.page.nome,
      valor: this.page.valor
    })
  }


  consoleForm() {
  }


}
