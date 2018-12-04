
import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { ResultPage } from './../result/result';
import { MainPage } from '..';


/**
 * Generated class for the SimulPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-simul',
  templateUrl: 'simul.html',
})
export class SimulPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public nav : Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimulPage');
  }

  calc(valorConta){
    console.log(valorConta);
    if(valorConta){
      this.nav.setRoot(ResultPage,{
        valorConta: valorConta
      });
    }

  }

}
