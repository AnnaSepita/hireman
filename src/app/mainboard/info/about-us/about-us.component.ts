import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent {

  constructor(public navCtrl: NavController) {
  }

  goBack () {
    this.navCtrl.pop();
  }

}
