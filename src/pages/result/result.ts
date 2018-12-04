import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  valorConta = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.calc(this.valorConta = this.navParams.get('valorConta')));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
  calc(valor){
    valor = valor.replace(',','.');
    valor = parseFloat(valor);
    valor = valor * 2;
    return valor;
  }

}
