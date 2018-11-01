import {Component} from "@angular/core";
import {User} from "./user-info/user-info.component";
import {UserService} from "../../shared/services/user.service";
import {UserSkillsService} from "../../shared/services/user-skills.service";
import {Skill} from "./user-skills/skill.component";


@Component({
    selector: 'page-profile',
    templateUrl: './profile.component.html',
})

export class ProfileComponent {
    public segment: string;
    public editMode: boolean;
    private user: User;
    private skills: Skill[];

    constructor(private userService: UserService,
                private userSkillService: UserSkillsService) {
        this.segment = 'info';
        this.editMode = true;
    }

    checkUser(){
      this.userService.getUser().then(res => {
        if(!res.first_name){
          return false;
        }else if(res.first_name){
          return true;
        }
      })
    }

    public editEnable() {
        this.editMode = !this.editMode;
    }

    onUserChange(data: User) {
        this.user = data;
    }

    onSkillChange(data: Skill[]) {
        this.skills = data;
    }

    save() {
        if (this.segment === 'info') {
            this.userService.update(this.user)
                .subscribe(() => {
                        this.editEnable();
                    },
                    err => {
                        console.log(err);
                    })
        } else if (this.segment === 'skills') {
            this.userSkillService.update(this.skills)
                .subscribe(() => {

                        this.editEnable();
                    },
                    err => {
                        console.log(err);
                    })
        }

    }


}
