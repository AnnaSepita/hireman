//ionic-angular module
import {NgModule} from '@angular/core';
import {IonicModule, IonicApp} from "ionic-angular";
import {BrowserModule} from "@angular/platform-browser";
import {IonicStorageModule} from "@ionic/storage";

//components
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

//services
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    IonicModule.forRoot(AuthModule),
    IonicStorageModule.forRoot(),
    BrowserModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    LoginComponent,
    RegistrationComponent,
  ],
  providers: [
    AuthService,
    UserService,
  ]
})
export class AuthModule {
}
