//ionic-angular module
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {IonicStorageModule} from "@ionic/storage";

import {MainboardModule} from "./mainboard/mainboard.module";
import {AuthModule} from "./auth/auth.module"

//ionic-cordova-native
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {StatusBar} from '@ionic-native/status-bar';
import {Network} from "@ionic-native/network";

//components
import {MyApp} from './app.component';
import {SliderComponent} from "./slider/slider.component";

//services
import {AuthService} from "./shared/services/auth.service";
import {RequestService} from "./shared/services/request.service";
import {UserService} from "./shared/services/user.service";
import {ConnectionService} from "./shared/services/connection.service";
import {AuthenticationInterceptor} from "./shared/interceptors/authentication.interceptor";
import {EntityService} from "./shared/base/entity.service";


@NgModule({
  declarations: [
    MyApp,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    MainboardModule,
    LoadingBarHttpClientModule,
    AuthModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SliderComponent,
  ],
  providers: [
    StatusBar,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    RequestService,
    EntityService,
    UserService,
    ConnectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }
  ]
})
export class AppModule {
}
