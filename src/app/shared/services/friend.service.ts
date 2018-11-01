import {Injectable} from "@angular/core";
import {EntityService} from "../base/entity.service";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";

@Injectable()

export class FriendService extends EntityService {

  constructor(public request: RequestService,
              public toast: ToastController) {
    super(request, toast);
    this.service_name = 'friend';
  }

    /**
     *
     * @param data
     * @returns {Observable<Object>}
     */
    incoming(data: Object = null) {
        const url = this.url('incoming');
        if (url) {
            return this.request.get(url, data);
        }
    }

    accept(data: Object = null) {
        const url = this.url('acc');
        if (url) {
            return this.request.get(url + data + '/accept');
        }

    }

    decline(data: Object = null) {
        const url = this.url('dec');
        if (url) {
            return this.request.get(url + data + '/deny');
        }
    }

}
