import {Component} from "@angular/core";
import {LoginComponent, loginCredentials} from "../login/login.component";
import {NavController} from "ionic-angular";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'page-registration',
  templateUrl: './registration.component.html'
})

export class RegistrationComponent {
  public isActive: boolean;
  public user: loginCredentials = {
    phone: '',
    password: ''
  };

  constructor(private navCtrl: NavController,
              private service: UserService) {
    this.isActive = true;
  }

  goToLogin() {
    this.navCtrl.push(LoginComponent);
  }

  registration() {
    if(this.service.credentialsCheck(this.user)){
    this.service.create(this.user)
      .subscribe(data => {
          this.navCtrl.push(LoginComponent);
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  showPass() {
    this.isActive = !this.isActive;
  }

}
