import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {EntityService} from "../base/entity.service";

@Injectable()

export class UserService extends EntityService {


  constructor(public request: RequestService,
              public toast: ToastController,
              private storage: Storage) {
    super(request, toast);
    this.service_name = 'user';
  }

  setUser(data) {
    this.storage.set('user', data);
  }

  getUser() {
    return this.storage.get('user');
  }

  firstEnter() {
    return {
      setTrue: () => {
        this.storage.set('firstEnter', 'Unfinished');
      },
      setFalse: () => {
        this.storage.set('firstEnter', 'Finished');
      },
      get: () => {
        return this.storage.get('firstEnter').then((data) => {
          return data;
        });
      },
    }
  }

  create(data: any) {
    const url = this.url('create');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('create');
          this.notification('success', msg);
        },
        err => {
          const msg = this.msg('err');
          this.notification('error', msg)
        });
  }

  credentialsCheck(data: any) {

    if (!data.phone || !data.password) {
      const msg = this.msg('empty');
      this.notification('error', msg);
      return false;
    }
    if (data.phone.length != 9) {
      const msg = this.msg('number');
      this.notification('error', msg);
      return false;
    }
    if (data.password.length < 6 || data.password.length > 15) {
      const msg = this.msg('password');
      this.notification('error', msg);
      return false;
    }
    return true;
  }

  validateEmail(email) {
    let validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
  }

  validateField(field) {
    let validator =  /^[a-zA-Zа-яА-Я]+$/;
    return validator.test(field);
  }

  credentialsCheckField(data: any) {

    if (!data.email || !data.first_name || !data.last_name || !data.city) {
      const msg = this.msg('empty');
      this.notification('error', msg);
      return false;
    }
    if (!this.validateEmail(data.email)) {
      const msg = this.msg('emailerr');
      this.notification('error', msg);
      return false;
    }
    if (!this.validateField(data.first_name) || !this.validateField(data.last_name)) {
      const msg = this.msg('field');
      this.notification('error', msg);
      return false;
    }if (!this.validateField(data.city)) {
      const msg = this.msg('city');
      this.notification('error', msg);
      return false;
    }
    return true;
  }



}
