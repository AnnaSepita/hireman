import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-support',
  templateUrl: './support.component.html',
})

export class SupportComponent {
  message: string = '';

  constructor(public navCtrl: NavController) {

  }

  sendMessage() {
    console.log("send");
  }

  disableSendButton() {
    if (!this.message && !this.message.length && this.message.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

}
