import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";
import {EntityService} from "../base/entity.service";

@Injectable()

export class JobService extends EntityService {

  constructor(public request: RequestService, public toast: ToastController) {
    super(request, toast);
    this.service_name = 'job';
  }

  apply(data: any) {
    const url = this.url('apply');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('apply');
          this.notification('success', msg);
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });
  }

  share(data: any) {
    const url = this.url('share');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('share');
          this.notification('success', msg);
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });
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

  applyOrder(data: any) {
    const url = this.url('remove');
    return this.request.remove(url + data)
      .do(() => {
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });
  }

  order(data: Object = null) {
    const url = this.url('order');
    if (url) {
      return this.request.get(url, data);
    }
  }



}
