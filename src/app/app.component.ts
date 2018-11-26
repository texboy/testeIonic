import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';

@Component({
  template: `<ion-menu [content]="content">


    <ion-content>
      <div class ="user">
        <img class = "user-login" src ="../assets/img/user.png">
        <div class="content-user">
          <span class="user-name">Thomas Johnson</span>
          <span class="user-plano">Plano Básico</span>
        </div>
      </div>
      <ion-list no-lines class ="toolbar-app">

        <div class ="toolbar-link">
          <button class ="toolbar-button" menuClose ion-item (click)="openPage('HomePage')">
          <div class="toolbar-item">
            <ion-icon color="primary" name =  "home"></ion-icon>
            Home
            </div>
          </button>
        </div>

        <div class="toolbar-link">
          <button class ="toolbar-button" menuClose ion-item (click)="openPage('TutorialPage')">
            <div class="toolbar-item">
              <ion-icon color="primary" name =  "help-circle"></ion-icon>
              Tutorial
            </div>
          </button>
        </div>

        <div class="bg-logoff">
          <button class ="btn-logoff" menuClose ion-item (click)="openPage('LoginPage')">
            <div>
              <ion-icon style ="color: white;" name =  "exit"></ion-icon>
              Sair
            </div>
          </button>
        </div>

      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage', icon: "Home"}
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('pt-br');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }
}
