import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {ActionSheetController, NavController} from "ionic-angular";
import {CameraService} from "../../../shared/services/camera.service";
import {DomSanitizer} from "@angular/platform-browser";
import {SkillListComponent} from "../skill-list-modal/skill-list.component";

export declare interface User {
  first_name: string,
  last_name: string,
  city: string,
  email: string,
  phone: string,
  passport_id: boolean,
  photo_path: any,
  photo: any
}

@Component({
  selector: 'page-profile-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {

  @Input() editMode: boolean;

  public isChanged: boolean;
  public entity: User = {
    first_name: '',
    last_name: '',
    city: '',
    email: '',
    phone: '',
    passport_id: false,
    photo_path: '',
    photo: ''
  };

  @Output() onUserChange = new EventEmitter<User>();


  public defaultImg: string;
  public imageURI: string;

  constructor(private service: UserService,
              private cameraService: CameraService,
              private actionSheetCtrl: ActionSheetController,
              private sanitizer: DomSanitizer,
              private navCtrl: NavController) {
    this.defaultImg = 'assets/imgs/camera.png';
    this.isChanged = false;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.service.get()
      .subscribe(success => {
        this.service.setUser(success["profile"]);
        this.entity = success["profile"];
        this.onUserChange.emit(this.entity);
      });
  }

  /**
   * Emit data to @ProfileComponent
   */
  onFormChange() {
    this.isChanged = true;
    this.onUserChange.emit(this.entity);
  }

  openPhotoActions() {
    if (!this.editMode) {
      return false;
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Оберіть',
      buttons: [
        {
          text: 'Камера',
          handler: () => {
            this.photoAddControl(1);
          }
        }, {
          text: 'Галерея',
          handler: () => {
            this.photoAddControl(2);
          }
        }, {
          text: 'Відмінити',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  photoAddControl(sourceType: number) {
    this.cameraService.getMedia(sourceType).then(res => {
      if (typeof res !== 'undefined') {
        this.entity.photo_path = this.sanitizer.bypassSecurityTrustResourceUrl(res);
        this.entity.photo = res;
        this.isChanged = true;
      }
    })
  }


  save() {
    if(this.service.credentialsCheckField(this.entity)){
    this.service.getUser().then(res => {
      if(res.first_name){
        this.service.update(this.entity)
          .subscribe(() => {
              this.isChanged = false;
            },
            err => {
              console.log(err);
            });
      }else if(!res.first_name){
        this.service.update(this.entity)
          .subscribe(() => {
              this.isChanged = false;
            },
            err => {
              console.log(err);
            });
        this.navCtrl.setRoot(SkillListComponent)
      }
    });
    }
  }

}
