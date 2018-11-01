import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";
import {EntityService} from "../base/entity.service";

@Injectable()

export class MyJobService extends EntityService {

  constructor(public request: RequestService, public toast: ToastController) {
    super(request, toast);
    this.service_name = 'my_job';
  }

  remove(data: any) {
    const url = this.url('remove');
    return this.request.remove(url + data)
      .do(() => {
          const msg = this.msg('remove');
          this.notification('success', msg);
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });
  }

  search(data: any) {
    const url = this.url('search');
    return this.request.post(url, data)

  }

}
