import {Component, OnInit} from "@angular/core";
import {ViewController} from "ionic-angular";
import {CountService} from "../../../shared/services/count.service";

export declare interface shareJob {
  recipient_id: Array<any>,
}


@Component({
  selector: 'page-share-job',
  templateUrl: './share-job.component.html',
})

export class ShareJobComponent implements OnInit{

  friendsArr: any;
  public isChanged: boolean;

  public elementsArr: shareJob = {
    recipient_id: [],
  };

  constructor(public viewCtrl: ViewController,
              private count: CountService){
    this.isChanged = false;
  }

  ngOnInit() {
    this.getFriend();
  }

  getFriend(){
    this.friendsArr = this.count.friendsArr;
  }

  checkArr(){
    if(this.elementsArr.recipient_id.length === 0){
      this.isChanged = false;
    }else{
      this.isChanged = true;
    }
  }


  back(){
    this.viewCtrl.dismiss()
  }

  save() {
    this.viewCtrl.dismiss(this.elementsArr.recipient_id);
  }

  onChangeCheckBox(id: number, event) {
    if (event.checked) {
      this.elementsArr.recipient_id.push(id);
      this.checkArr();
      console.log(this.elementsArr, "do")

    } else {
      this.elementsArr.recipient_id = this.elementsArr.recipient_id.filter(function (element) {
        return element !== id;
      });
      this.checkArr();
      console.log(this.elementsArr, "posle")
    }
  }


}
