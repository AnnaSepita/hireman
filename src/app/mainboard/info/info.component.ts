import {Component, OnInit} from "@angular/core";
import {App, AlertController, NavController} from "ionic-angular";
import {SupportComponent} from "./support/support.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {LoginComponent} from "../../auth/login/login.component";

@Component({
  selector: 'page-info',
  templateUrl: './info.component.html',
})

export class InfoComponent implements OnInit {
    imageURI: any;
    imageURI2: any;
    imageURI3: any;
    imageURI4: any;


  constructor(
      public navCtrl: NavController,
              public alertCtrl: AlertController,
              public appCtrl: App) {
      this.imageURI = 'assets/icon/star.png';
      this.imageURI2= 'assets/icon/call_man.png';
      this.imageURI3= 'assets/icon/info.png';
      this.imageURI4= 'assets/icon/exit.png';
  }

  ngOnInit() {

  }

  toRate(){
    console.log("rate app");
  }

  toHelp() {
    this.navCtrl.push(SupportComponent);
  }

  toAbout() {
    this.navCtrl.push(AboutUsComponent);
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте вийти з додатку?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Так',
          handler: () => {
            delete localStorage.token;
            delete localStorage.user_id;
            this.appCtrl.getRootNavs()[0].setRoot(LoginComponent);
          }
        }
      ]
    });
    alert.present();
  }

}
