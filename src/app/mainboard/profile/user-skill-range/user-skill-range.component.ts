import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";

declare interface Skill {
    name: string,
    level: number
}


@Component({
    selector: 'page-profile-user-skill-range',
    templateUrl: './user-skill-range.component.html'
})
export class UserSkillRangeComponent {
    public entity: Skill[];
    public level: number;

    constructor(private viewCtrl: ViewController) {
        this.level = 1;
    }

    dismiss() {
        const data = {
            level: this.level
        };
        this.viewCtrl.dismiss(data);
    }

}
