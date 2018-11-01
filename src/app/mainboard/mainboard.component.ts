import {Component, OnInit} from '@angular/core';
import {JobListComponent} from "./job-list/job-list.component";
import {FriendComponent} from "./friend/friend.component";
import {ProfileComponent} from "./profile/profile.component";
import {InfoComponent} from "./info/info.component";
import {FriendService} from "../shared/services/friend.service";
import {CountService} from "../shared/services/count.service";

@Component({
  selector: 'page-mainboard',
  templateUrl: 'mainboard.component.html'
})
export class MainboardComponent implements OnInit{
  friendsArr: any;
  friendsRequestsArr: any;

  tab1Root = JobListComponent;
  tab2Root = FriendComponent;
  tab3Root = ProfileComponent;
  tab4Root = InfoComponent;

  constructor(public service: FriendService,
              public count: CountService) {
  }

  ngOnInit(){
    this.getFriendsRequests();
    this.getFriends();
  }
  getFriends(){
    this.service.get()
      .subscribe(success => {
        this.friendsArr = success;
        this.count.getFriends(success)
      })
  }
  getFriendsRequests () {
    this.service.incoming()
      .subscribe(success => {
        this.friendsRequestsArr = success;
        this.count.getRequests(success)
      })
  }


}
