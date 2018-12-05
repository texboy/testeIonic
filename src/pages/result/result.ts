import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  /** Parametros pré-definidos */
  valorConta = 0;
  tarifaImpostos = 0.70;
  hspCorrigido = 4.9 * 0.75;
  potenciaModulo = 320.00;
  taxaDisponibilidade = 50.00;
  inflacaoEnergetica = 10.00;
  n1 = 0;

  /** Resultados da simulação */
  qtdModulos;
  ptcSistema;
  areaAplicacao;
  engMensalEstimada;
  valorMinimoSistema;
  percEconomizado;
  valorEconomizado;
  valorContaEnergiaDepois;
  contaEnergia25 = 0;
  contaEnergiaSolar = 0;
  economiaTotal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
    this.valorConta = this.transformConta(this.valorConta = this.navParams.get('valorConta'));
    this.calc();
    console.log(this.qtdModulos);
    console.log(this.ptcSistema);
    console.log(this.areaAplicacao);
    console.log(this.engMensalEstimada);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
  transformConta(valor){
    valor = valor.replace(',','.');
    valor = parseFloat(valor);
    return valor;
  }
  openPage(page){
    this.nav.setRoot(page);
  }
  calc(){
    this.calcModulo();
    this.calcPotencia();
    this.calcAreaAp();
    this.calcEnergiaMensal();
  }

  calcModulo(){
    if(this.valorConta > 150){

      this.qtdModulos =
      ((this.valorConta - this.taxaDisponibilidade * this.tarifaImpostos) * 1000) /
       (30 * this.hspCorrigido * this.tarifaImpostos * this.potenciaModulo);

      this.qtdModulos = Math.ceil(this.qtdModulos);

    }else{
      this.qtdModulos = 5;
    }
  }
  calcPotencia(){

      this.ptcSistema = (this.qtdModulos * this.potenciaModulo) / 1000;

  }
  calcAreaAp(){
    this.areaAplicacao = this.qtdModulos * this.ptcSistema;
  }
  calcEnergiaMensal(){
    this.engMensalEstimada = this.ptcSistema * 30 * this.hspCorrigido;
  }

}
