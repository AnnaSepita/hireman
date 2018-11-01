import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserSkillsService} from "../../../shared/services/user-skills.service";
import {AlertController, ModalController} from "ionic-angular";
import {SkillListComponent} from "../skill-list-modal/skill-list.component";

export declare interface Skill {
  description: string,
  lvl: number,
  id: number
}

export declare interface RemoveId {
  skill_id: Array<string>;
}


@Component({
  selector: 'page-profile-skill',
  templateUrl: './skill.component.html'
})
export class SkillComponent {
  public entity: Skill[];
  public isChanged: boolean;
  public elementArr: RemoveId = {
    skill_id: []
  };

  @Input() editMode: boolean;
  @Output() onSkillChange = new EventEmitter<Skill[]>();

  constructor(private service: UserSkillsService,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {
    this.isChanged = false;
  }


  ngOnInit() {
    this.getMySkill();
  }

  getMySkill() {
    this.service.get()
      .subscribe(success => {
        this.entity = success['myskill'];
        this.onSkillChange.emit(this.entity);
      });
  }

  deleteSkill(skill_id: string) {
    this.elementArr.skill_id.push(skill_id + '');
    this.openAlert();
  }

  openAlert() {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте видалити навичку?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.elementArr.skill_id = []
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.service.remove(this.elementArr)
              .subscribe((data) => {
                this.getMySkill();
              });
          }
        }
      ]
    });
    alert.present();
  }

  goToAddSkill() {
    let profileModal = this.modalCtrl.create(SkillListComponent);
    profileModal.onDidDismiss(data => {
      this.getMySkill();
    });
    profileModal.present();
  }

  onFormChange() {
    this.isChanged = true;
    this.onSkillChange.emit(this.entity);
  }

  save() {
    this.service.update(this.entity)
      .subscribe(() => {
          this.isChanged = false;
        },
        err => {
          console.log(err);
        })
  }

}


