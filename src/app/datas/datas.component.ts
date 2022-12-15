import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datas',
  templateUrl: './datas.component.html',
  styleUrls: ['./datas.component.scss']
})
export class DatasComponent implements OnInit {

  public dataFuturo: any;
  public dataPassado: any;
  public dataFormatada: any;
  public dataPassadoView: any;
  public mensagem: string = "";
  public CALC_MES: number = 30.417;
  public dataHoje: Date = new Date();
  public mostrarDatas: boolean = false;
  private restoDivisaoMes: any;
  private restoDivisaoDia: any;
  public form: FormGroup = new FormGroup({});

  public dia: any;
  public mes: any;
  public ano: any;
  public diff: any;

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dataFormatada = this.datePipe.transform(this.dataHoje, 'dd/MM/yyyy');

    this.form = this.fb.group({
      data1: ['', [Validators.required]],
      data2: [this.dataFormatada, [Validators.required]],
    });
  }

  public mostrarContagem() {
    this.dataPassadoView = this.form.get('data1')?.value;
    let dia = this.dataPassadoView.slice(0, 2);
    let mes = this.dataPassadoView.slice(2, 4);
    let ano = this.dataPassadoView.slice(4);
    this.dataPassadoView = `${dia}/${mes}/${ano}`;
    this.dataPassado = `${ano}-${mes}-${dia}`

    this.calculoDataPassadoParaHoje();
    if (this.dataPassado != "") {
      this.mostrarDatas = true;
    }
  }

  public calculoDataPassadoParaHoje() {
    this.dataPassado = new Date(this.dataPassado);

    if (this.dataHoje >= this.dataPassado) {
      this.diff = Math.abs(this.dataHoje.getTime() - this.dataPassado.getTime());
      this.dia = Math.ceil(this.diff / (1000 * 60 * 60 * 24) -1);
      this.mes = this.dia / this.CALC_MES;
      this.restoDivisaoDia = Math.floor(this.dia % this.CALC_MES);  
      this.ano = this.dia / 365;
      this.restoDivisaoMes = this.mes % 12
      console.log("OK");
      
      

      if (this.dia > 30) {
        if (this.mes > 12) {
          this.mensagem = `Entre ${this.dataPassadoView} até hoje passaram: ${Math.trunc(this.ano)} ano(s) ${Math.trunc(this.restoDivisaoMes)} mes(es) e ${this.restoDivisaoDia} dia(s)!`;

        } else {
          this.mensagem = `Entre ${this.dataPassadoView} até hoje passaram: ${Math.trunc(this.restoDivisaoMes)} mes(es) e ${this.restoDivisaoDia} dia(s)!`;
        }
      } else {
        this.mensagem = `Entre ${this.dataPassadoView} até hoje passaram: ${this.restoDivisaoDia} dia(s)!`;
      }

    } else {
      this.mensagem = `Data Superior a data de Hoje`;      
    }
  }
}
