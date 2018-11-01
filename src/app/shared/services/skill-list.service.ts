import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";
import {EntityService} from "../base/entity.service";

@Injectable()

export class SkillListService extends EntityService {

    constructor(public request: RequestService, public toast: ToastController) {
        super(request, toast);
        this.service_name = 'all_skill';
    }

}
