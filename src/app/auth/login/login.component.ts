import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {NavController} from 'ionic-angular';
import {RegistrationComponent} from "../registration/registration.component";
import {UserService} from "../../shared/services/user.service";
import {MainboardComponent} from "../../mainboard/mainboard.component";
import {ProfileComponent} from "../../mainboard/profile/profile.component";

export declare interface loginCredentials {
  phone: string,
  password: string
}

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  public isActive: boolean;
  public user: loginCredentials = {
    phone: '',
    password: ''
  };

  constructor(private auth: AuthService,
              private navCtrl: NavController,
              private userService: UserService) {
    this.isActive = true;
  }


  login() {
    if(this.userService.credentialsCheck(this.user)){
    this.auth.login(this.user)
      .subscribe(success => {
          localStorage.token = success['user']['api_token'];
          localStorage.user_id = success['user']['id'];
          this.userService.setUser(success['user']);
          this.userService.firstEnter().get().then(res => {
            if(res === 'Unfinished'){
              this.userService.firstEnter().setFalse();
              this.userService.getUser().then(res => {
                if(!res.last_name){
                  this.navCtrl.setRoot(ProfileComponent);
                }else{
                  this.navCtrl.setRoot(MainboardComponent);
                }
              });
            }else if(res === 'Finished') {
              this.userService.getUser().then(res => {
                if(!res.last_name){
                  this.navCtrl.setRoot(ProfileComponent);
                }else{
                  this.navCtrl.setRoot(MainboardComponent);
                }
              });
            }
          });
        },
        error => {
          console.log(error)
        });
    }
  }

  goToRegistration() {
    this.navCtrl.push(RegistrationComponent);
  }

  showPass() {
    this.isActive = !this.isActive;
  }

}
