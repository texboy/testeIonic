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
  contaEnergia25Solar = 0;
  economiaTotal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
    this.valorConta = this.transformConta(this.valorConta = this.navParams.get('valorConta'));
    this.calc();
    console.log(this.qtdModulos);
    console.log(this.ptcSistema);
    console.log(this.areaAplicacao);
    console.log(this.engMensalEstimada);
    console.log(this.valorMinimoSistema);
    console.log(this.percEconomizado);
    console.log(this.valorEconomizado);
    console.log(this.valorContaEnergiaDepois);
    console.log(this.contaEnergia25);
    console.log(this.contaEnergia25Solar);
    console.log(this.economiaTotal);

    this.valorConta = this.formatMoney(this.valorConta,'R$ ');

    this.valorContaEnergiaDepois = this.formatMoney(this.valorContaEnergiaDepois,'R$ ');
    this.valorEconomizado = this.formatMoney(this.valorEconomizado,'R$ ');

    this.contaEnergia25 = this.formatMoney(this.contaEnergia25,'R$ ');
    this.contaEnergia25Solar = this.formatMoney(this.contaEnergia25Solar,'R$ ');
    this.economiaTotal = this.formatMoney(this.economiaTotal,'R$ ');




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
    this.calcValorMinSis();
    this.calcPercEconomizado();
    this.calcValEconomizado();
    this.calcValorContaDepois();
    this.calcEnergia25();
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
  calcValorMinSis(){
    this.valorMinimoSistema= this.ptcSistema *
    ( 7.392 + 12.99 * Math.exp(-0.7655 * this.ptcSistema) ) * 1000 ;
  }
  calcPercEconomizado(){
    this.percEconomizado = this.engMensalEstimada * this.tarifaImpostos / this.valorConta * 100;
  }
  calcValEconomizado(){
    this.valorEconomizado =  this.engMensalEstimada * this.tarifaImpostos;
  }
  calcValorContaDepois(){
    if((this.valorConta - this.valorEconomizado) < this.tarifaImpostos * this.taxaDisponibilidade){


      this.valorContaEnergiaDepois = this.valorConta - this.valorEconomizado;
      this.valorContaEnergiaDepois = Math.round(this.valorContaEnergiaDepois*100)/100;

    }else{

      this.valorContaEnergiaDepois = this.tarifaImpostos * this.taxaDisponibilidade;

    }
  }

  calcEnergia25(){

    /**Conta antes */
    let valoresAntes = [];
    let i = 0;
    valoresAntes[0] = this.valorConta;

    for(i = 1;i < 25; i++){
      valoresAntes[i] = valoresAntes[i-1] * (1+(this.inflacaoEnergetica / 100));
    }


    /**Conta depois */

    let valoresDepois = [];
    valoresDepois[0] = this.valorContaEnergiaDepois;

    for(i = 1;i < 25; i++){
      valoresDepois[i] = valoresDepois[i-1] * (1+(this.inflacaoEnergetica / 100));
    }

    /* Conta de Energia em 25 anos */

    for(i=0;i<25;i++){
      this.contaEnergia25 += valoresAntes[i] * 12;
    }

     /* Conta de Energia com Energia Solar */
     for(i=0;i<25;i++){
      this.contaEnergia25Solar += valoresDepois[i] * 12;
    }

    this.economiaTotal = this.contaEnergia25 - this.contaEnergia25Solar;

    console.log(this.contaEnergia25);


  }

  formatMoney(n, currency) {
    return currency + n.toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }


}
