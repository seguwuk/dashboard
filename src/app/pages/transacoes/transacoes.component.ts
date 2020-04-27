import { ExtratosService } from './../../shared/extratos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from "@angular/forms";

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
  ) { }

  ngOnInit() {
    this.initForm();
    this.getExtrato();
  }



  getExtrato() {
    this.service.getData().subscribe(success => {
      // 
      let tempReturn = [success]
      this.page = []
      tempReturn.forEach(i => {
              Object.values(i).forEach(element => {
          console.log('opbjectelements', element)
          this.page.push(element)
        });
      });
      console.log(this.page)

    },
      err => {
        console.log(err)
      }
    )
  }

  onSubmit() {
    this.service.addData(this.formExtrato.value).subscribe(retunrid => {
      console.log(retunrid);
      this.idTransacao = retunrid['name']
      this.dataId = {
        id: retunrid['name']
      }
      this.adicionaID()
      err => {
        console.log(err)
      }
    }, err => {
      console.log(err)
    }
    )
  }

  
  //   onSubmit(form: NgForm) {
  //     console.log('Your form data : ', form.value );
  // }

  adicionaID() {
    console.log(this.idTransacao)
    console.log(this.dataId)
    this.service.addId(this.idTransacao, this.dataId).subscribe(success => {
      console.log(success)
      this.onRefresh()

    },
      err => {
        console.log(err)
      })
  }


  excluirTransacao(id) {
    console.log(id)
    this.service.excludeId(id).subscribe(success=>{
      console.log(success);
      this.onRefresh();
    },
      err=>{
        console.log(err)
      })
    }
    

  initForm() {
    this.formExtrato = this.formBuilder.group({
      id: '' ,
      // tipo: new FormControl('', Validators.required),
      // nome: new FormControl('', Validators.required),
      // valor: new FormControl('', Validators.required),
      tipo:  ['', Validators.required],
      nome:  ['', Validators.required],
      valor:  ['', Validators.required],
    })
  }

  setForm() {
    console.log(this.page)
    this.formExtrato.patchValue({
      tipo: this.page.tipo,
      nome: this.page.nome,
      valor: this.page.valor
    })

    console.log(this.formExtrato)
  }


  consoleForm() {
    console.log(this.formExtrato)
  }

  onRefresh() {
    this.ngOnInit()
  }

}
