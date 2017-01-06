import { Component, NgModule } from '@angular/core';
import { Config, IonicApp, IonicModule, App, AlertController, ModalController, ViewController, Tab, Tabs, Events } from '../../../..';

//
// Modal
//
@Component({
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-buttons start>
        <button ion-button (click)="dismiss()">Cancel</button>
      </ion-buttons>

      <ion-title>
        Filter Sessions
      </ion-title>

      <ion-buttons end>
        <button ion-button (click)="dismiss()">Done</button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="outer-content">
    <ion-list>
      <ion-list-header>Tracks</ion-list-header>

      <ion-item *ngFor="let i of items">
        <ion-label>Toggle {{i}}</ion-label>
        <ion-toggle color="secondary"></ion-toggle>
      </ion-item>
    </ion-list>

    <ion-list>
      <button ion-item color="danger" detail-none>
        Reset All Filters
      </button>
      <button ion-item color="danger" detail-none (click)="appNavPop()">
        App Nav Pop
      </button>
    </ion-list>
  </ion-content>
  `
})
export class MyModal {
  items: any[] = [];

  constructor(private viewCtrl: ViewController, private app: App) {
    for (var i = 1; i <= 10; i++) {
      this.items.push(i);
    }
  }

  dismiss() {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss();
  }

  appNavPop() {
    this.app.navPop();
  }
}

//
// Tab 1
//
@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Home</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <p>Tap the third tab below to fire broken events</p>
      <p>Then change to Tab 2 and back to Home</p>
      <p>{{datatest}} called: {{called}}</p>
      <button ion-button (click)="change()">Fire events correctly</button>
    </ion-content>
    `
})
export class Tab1 {
  datatest: string = 'old';
  called: number = 0;
  constructor(public events: Events) {
    this.events.subscribe('data:changed', this.change.bind(this));
  }
  change() {
    console.log(this.datatest);
    console.log('data changed!');
    this.called++ ;
    this.datatest = 'new!';
  }
}

//
// Tab 2
//
@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Tab 2</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
    Change back to home
    </ion-content>
  `
})
export class Tab2 {}


@Component({
  template: `
    <ion-tabs>
      <ion-tab tabTitle="Home" tabIcon="star" [root]="root1" ></ion-tab>
      <ion-tab tabTitle="Tab 2" tabIcon="globe" [root]="root2"></ion-tab>
      <ion-tab tabTitle="Break events" tabIcon="camera" (ionSelect)="takePhoto()"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {
  root1 = Tab1;
  root2 = Tab2;

  constructor(public events: Events) { }
  takePhoto() {
    this.events.publish('data:changed');
  }
}

@Component({
  template: `<ion-nav [root]="root"></ion-nav>`
})
export class E2EApp {
  root = TabsPage;
}

@NgModule({
  declarations: [
    E2EApp,
    MyModal,
    Tab1,
    Tab2,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(E2EApp, {
      tabsHighlight: true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    E2EApp,
    MyModal,
    Tab1,
    Tab2,
    TabsPage
  ]
})
export class AppModule { }
