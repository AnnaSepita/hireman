import {Injectable} from "@angular/core"

@Injectable()
export class CountService {
  public friendsArr: any;
  public friendsRequestsArr: any;

  getFriends(data){
    this.friendsArr = data
  }

  getRequests(data){
    this.friendsRequestsArr = data
  }
}
