import {Component, OnInit, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {ScreenOrientation} from "@ionic-native/screen-orientation";

import {SliderComponent} from "./slider/slider.component";
import {LoginComponent} from "./auth/login/login.component";
import {MainboardComponent} from "./mainboard/mainboard.component";
import {ConnectionService} from "./shared/services/connection.service";
import {UserService} from "./shared/services/user.service";
import {ProfileComponent} from "./mainboard/profile/profile.component";
import {SplashScreen} from "@ionic-native/splash-screen";

@Component({
  selector: 'root',
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private screenOrientation: ScreenOrientation,
              private connection: ConnectionService,
              private user: UserService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      statusBar.styleDefault();
      this.user.firstEnter().get().then((res) => {
        if (!res) {
          this.navCtrl.setRoot(SliderComponent);
        }
        if (res === 'Unfinished') {
          this.navCtrl.setRoot(LoginComponent);
        }
        if (res === 'Finished' && !localStorage.user_id) {
          this.navCtrl.setRoot(LoginComponent)
        }else if(res === 'Finished' && localStorage.user_id){
          this.user.getUser().then((res) => {
            if (!res.last_name) {
              this.navCtrl.setRoot(ProfileComponent)
            } else {
              this.navCtrl.setRoot(MainboardComponent);
            }
          })
        }
      });
      splashScreen.hide();
    });

    // platform.ready().then(() => {
    //     this.push.hasPermission()
    //         .then((res: any) => {
    //             if (res.isEnabled) {
    //                 console.log('We have permission to send push notifications');
    //             } else {
    //                 console.log('We do not have permission to send push notifications');
    //             }
    //
    //         });
    //     this.push.createChannel({
    //         id: "testchannel1",
    //         description: "My first test channel",
    //         // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    //         importance: 3
    //     }).then(() => console.log('Channel created'));
    //     const options: PushOptions = {
    //         android: {},
    //         ios: {
    //             alert: 'true',
    //             badge: true,
    //             sound: 'false'
    //         },
    //         windows: {},
    //         browser: {
    //             pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    //         }
    //     };
    //     const pushObject: PushObject = this.push.init(options);
    //
    //     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    //
    //     pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    //
    //     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    //
    //     statusBar.styleDefault();
    //     splashScreen.hide();
    //     //
    // });
    // platform.registerBackButtonAction(() => {
    //     console.log("backPressed 1");
    // }, 1);

  }

  ngOnInit() {
    this.connection.startMonitoringConnection();
  }

}

