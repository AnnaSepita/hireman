import {Injectable} from '@angular/core';
import {RequestService} from "../services/request.service";
import {Entity} from '../intefaces/entity.interface';
import {ToastController} from "ionic-angular";
import {ConstantHelperService} from "./constant-helper.service";


@Injectable()
export class EntityService extends ConstantHelperService implements Entity {


  constructor(public request: RequestService, public toastCtrl: ToastController) {
    super(toastCtrl);
  }


  /**
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  get(data: Object = null) {
    const url = this.url('index');
    if (url) {
      return this.request.get(url, data);
    }
  }
  /**
   *
   * @param data
   * @returns {Observable<Object>}
   */

  create(data: any) {
    const url = this.url('create');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('create');
          this.notification('success', msg);
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });
  }

  /**
   *
   * @param data
   * @returns {Observable<any>}
   */
  remove(data: any) {
    const url = this.url('remove');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('remove');
          this.notification('success', msg);
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });
  }

  /**
   *
   * @param data
   * @returns {Observable<any>}
   */
  update(data: any) {
    const url = this.url('update');
    return this.request.put(url, data)
      .do(() => {
          const msg = this.msg('update');
          this.notification('success', msg);
        },
        err => {
          this.incorrectValidationErrors(err.error.error);
        });

  }


  public incorrectValidationErrors(errors: Array<String>) {
    let errorMsg = "";
    for (var i in errors) {
      const obj = errors[i];
      errorMsg += obj + " ";
    }
    this.notification('error', errorMsg);
  }

}
