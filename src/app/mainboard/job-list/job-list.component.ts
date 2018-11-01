import {Component, OnInit} from "@angular/core";
import {JobService} from "../../shared/services/all-job.service";
import {MyJobService} from "../../shared/services/my-job.service";
import {AlertController, ModalController} from "ionic-angular";
import {ShareJobComponent} from "./share-job-modal/share-job.component";


export declare interface applyJob {
  job_id: any,
  user_id: any

}

export declare interface searchJob {
  search: any
}

export declare interface shareJob {
  job_id: Array<number>;
  recipient_id: Array<number>;
}

@Component({
  selector: 'page-job-list',
  templateUrl: './job-list.component.html',
})

export class JobListComponent implements OnInit {
  imageURI: any;
  imageURI2: any;
  imageURI3: any;
  imageURI4: any;
  jobsId: any;
  sendId: any;
  public category: string;
  public allJobsList: any;
  public myJobsList: any;
  public orderJobsList: any;
  public showSearchbar: boolean;
  myJobs: boolean = false;

  public apply: applyJob = {
    job_id: '',
    user_id: ''

  };
  public searchVal: searchJob = {
    search: ''
  };
  public share: shareJob = {
    job_id: [],
    recipient_id: []
  };


  constructor(private service: JobService,
              private myService: MyJobService,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController) {

    this.category = 'all';
    this.showSearchbar = false;
    this.imageURI = 'assets/icon/calendar-check.svg';
    this.imageURI2= 'assets/icon/money-bill.svg';
    this.imageURI3= 'assets/icon/compass.svg';
    this.imageURI4= 'assets/icon/arrows.svg';

  }

  ngOnInit() {
    this.getAll();
    this.getMyJobs();
  }


  getAll() {
    this.service.get()
      .subscribe(success => {
        if (success) {
          this.allJobsList = success;
        }
      });
    this.service.order()
      .subscribe(success => {
        if (success) {
          this.orderJobsList = success;
        }
      })
  }

  getMyJobs() {
    this.myService.get()
      .subscribe(success => {
        if (success) {
          this.myJobsList = success;
        }
      })
  }

  setMyJob() {
    this.myJobs = true;
    this.showSearchbar = false;
  }

  setAllJob() {
    this.myJobs = false;
  }

  showSearchBar() {
    this.showSearchbar = !this.showSearchbar;
    if (!this.showSearchbar && this.searchVal.search) {
      this.getAll()
    }
    this.searchVal.search = '';
  }

  /**
   * Emit data to @JobListComponent
   */
  onSearchChange(data: any) {
    this.searchVal.search = data.target.value;
    this.myService.search(this.searchVal)
      .subscribe(success => {
          this.allJobsList = success
        },
        err => {
          this.getAll();
          this.searchVal.search = '';
        }
      )
  }

  moreInfo(jobsId, sendId) {
    this.jobsId = jobsId;
    this.sendId = sendId;
  }

  deleteMyJobs(id) {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте видалити заявку?',
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
            this.myService.remove(id)
              .subscribe(() => {
                this.getMyJobs();
                this.getAll();
              })
          }
        }
      ]
    });
    alert.present();
  }

  declineOrder(id) {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте відхилити запропоновану пропозицію?',
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
            this.service.remove(id)
              .subscribe(() => {
                this.getAll();
              })
          }
        }
      ]
    });
    alert.present();
  }

  applyJob(id) {
    this.apply.job_id = id + '';
    this.apply.user_id = +localStorage.user_id;
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте подати заявку на данну пропозицію?',
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
            this.service.apply(this.apply)
              .subscribe(() => {
                this.getAll();
                this.getMyJobs();
              })
          }
        }
      ]
    });
    alert.present();
  }

  applyOrder(job_id, order_id){
    this.apply.job_id = job_id + '';
    this.apply.user_id = +localStorage.user_id;
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте подати заявку на данну пропозицію?',
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
            this.service.apply(this.apply)
              .subscribe(() => {
                this.getMyJobs();

              });
            this.service.applyOrder(order_id)
              .subscribe(() => {
                this.getAll();
                console.log("udalil")
              })
          }
        }
      ]
    });
    alert.present();
  }

  shareJob(id) {
    this.share.job_id.push(id);
    let recipientModal = this.modalCtrl.create(ShareJobComponent);
    recipientModal.onDidDismiss(data => {
      if(data){
        this.share.recipient_id = data;
        this.sendOrderJob();
      }
    });
    recipientModal.present();
  }

  sendOrderJob(){
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви бажаєте відправити цим контактам заявку на данну пропозицію?',
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
            this.service.share(this.share)
              .subscribe(() => {
                this.share.job_id = [];
              });
          }
        }
      ]
    });
    alert.present();
  }

}
