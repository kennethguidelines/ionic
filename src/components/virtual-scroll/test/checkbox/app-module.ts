import { Component, NgModule } from '@angular/core';
import { IonicApp, IonicModule, Platform } from '../../../..';


@Component({
  templateUrl: 'main.html'
})
export class E2EPage {
  items: any[] = [];
  webview: string = '';
  type: string = 'radio';
  testCheck: boolean;

  constructor(plt: Platform) {
    for (var i = 0; i < 200; i++) {
      if (i % 5 === 0) {
        this.changeType();
      }

      this.items.push({
        value: i,
        type: this.type,
        class: `item-${i}`
      });
    }

    if (plt.is('ios')) {
      if (plt.testUserAgent('Safari')) {
        this.webview = ': iOS Safari';

      } else if (!!window['webkit']) {
        this.webview = ': iOS WKWebView';

      } else {
        this.webview = ': iOS UIWebView';
      }
    }
  }

  changeType() {
    if (this.type === 'radio') {
      this.type = 'checkbox';
    } else if (this.type === 'checkbox') {
      this.type = 'toggle';
    } else {
      this.type = 'radio';
    }
  }

  reload() {
    window.location.reload(true);
  }

}


@Component({
  template: '<ion-nav [root]="root"></ion-nav>'
})
export class E2EApp {
  root = E2EPage;
}


@NgModule({
  declarations: [
    E2EApp,
    E2EPage
  ],
  imports: [
    IonicModule.forRoot(E2EApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    E2EApp,
    E2EPage
  ]
})
export class AppModule {}
