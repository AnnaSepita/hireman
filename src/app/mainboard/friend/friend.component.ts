import {Component, OnInit} from "@angular/core";
import {FriendService} from "../../shared/services/friend.service";
import {CountService} from "../../shared/services/count.service";
import {AlertController, NavController} from "ionic-angular";
import {PhoneContactsComponent} from "./phone-contacts.component/phone-contacts.component";


export declare interface RemoveId {
  user_id: Array<string>;
}

@Component({
  selector: 'page-friend',
  templateUrl: './friend.component.html',
})

export class FriendComponent implements OnInit {
  friendsRequestsArr: any;
  friendsArr: any;
  public elementArr: RemoveId = {
    user_id: []
  };


  constructor(public service: FriendService,
              public count: CountService,
              public alertCtrl: AlertController,
              public navCtrl: NavController) {
  }

  ngOnInit() {
    this.getFriends();
    this.getRequests();
  }

  getFriends() {
    this.friendsArr = this.count.friendsArr;
  }

  getRequests() {
    this.friendsRequestsArr = this.count.friendsRequestsArr;
  }


  toContacts() {
    this.navCtrl.push(PhoneContactsComponent)
  }

  declineFriend(user) {
    this.service.decline(user.id)
      .subscribe(() => {
        this.friendsRequestsArr.splice(this.friendsRequestsArr.indexOf(user), 1)
      })
  }

  acceptFriend(user) {
    this.service.accept(user.id)
      .subscribe(() => {
        this.friendsRequestsArr.splice(this.friendsRequestsArr.indexOf(user), 1);
        this.friendsArr.push(user);
      })
  }

  deleteFriend(user) {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте видалити контакт?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            this.elementArr.user_id = []
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.elementArr.user_id.push(user.id);
            this.service.remove(this.elementArr)
              .subscribe(() => {
                this.friendsArr.splice(this.friendsArr.indexOf(user), 1)
              });
          }
        }
      ]
    });
    alert.present();
  }

}
