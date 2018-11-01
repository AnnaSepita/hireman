import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginComponent} from "../auth/login/login.component";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'page-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit{
  imageURI: any;
  imageURI2: any;
  imageURI3: any;


  constructor(public navCtrl: NavController,
              public userService: UserService) {

    this.imageURI = 'assets/icon/dollar-coin.svg';
    this.imageURI2 = 'assets/icon/man-wearing-business-attire-with-suitcase-in-a-city.svg';
    this.imageURI3 = 'assets/icon/businessman-paper-of-the-application-for-a-job.svg';

  }

  ngOnInit(){
  }

  tolog() {
    this.userService.firstEnter().setTrue();
    this.navCtrl.push(LoginComponent);
  }

}
