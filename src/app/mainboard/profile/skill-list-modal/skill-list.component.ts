import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, ViewController} from "ionic-angular";
import {SkillListService} from "../../../shared/services/skill-list.service";
import {UserSkillRangeComponent} from "../user-skill-range/user-skill-range.component";
import {UserSkillsService} from "../../../shared/services/user-skills.service";
import {UserService} from "../../../shared/services/user.service";
import {MainboardComponent} from "../../mainboard.component";

declare interface UserSkill {
  skill_id: number,
  level: number
}

@Component({
  selector: 'page-profile-skill-list',
  templateUrl: './skill-list.component.html'
})

export class SkillListComponent implements OnInit{
  public entity: any[];
  public skills: Array<UserSkill>;
  public isenabled: boolean = true;

  constructor(private service: SkillListService,
              private viewCtrl: ViewController,
              private modal: ModalController,
              private userSkillService: UserSkillsService,
              private userService: UserService,
              private navCtrl: NavController) {
    this.skills = [];
  }


  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.get()
      .subscribe(success => {
        this.entity = success['all'];
        if(success['all'].length === 0){
          this.isenabled = false;
        }
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  save() {
    this.userService.getUser().then(res => {
      if(res.first_name){
        this.userSkillService.create(this.skills)
          .subscribe(data => {
            this.dismiss();
          })
      }else if(!res.first_name){
        this.userSkillService.create(this.skills)
          .subscribe(data => {
            this.navCtrl.setRoot(MainboardComponent);
          })
      }
      });
  }

  onChangeCheckBox(id: number, event) {
    if (event.checked) {
      let profileModal = this.modal.create(UserSkillRangeComponent, {skill_id: id});
      profileModal.onDidDismiss(data => {
        const skillObject = {
          skill_id: id,
          level: data.level
        };
        this.skills.push(skillObject);
        console.log(this.skills);
      });
      profileModal.present();
    } else {
      this.skills = this.skills.filter(function (element) {
        return element.skill_id !== id;
      });
    }
  }

}
