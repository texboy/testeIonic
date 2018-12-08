import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('mySlider') mySlider: any;

  slides =  [
             {
               "img": "assets/img/home.png?t=-950866085quality=60&h=800",
               "titulo": "Simule o quanto irá economizar!",
               "texto": "Teste",
               },
               {
                "img": "assets/img/home.png?t=-950866085quality=60&h=800",
                "titulo": "Teste",
                "texto": "Teste",
                },
           ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  slideNext(){
    this.mySlider.slideNext();
  }

  slidePrev(){
    this.mySlider.slidePrev();
  }

}
