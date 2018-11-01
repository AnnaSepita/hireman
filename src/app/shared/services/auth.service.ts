import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {loginCredentials} from "../../auth/login/login.component";
import {ToastController} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {ConstantHelperService} from "../base/constant-helper.service";


@Injectable()

export class AuthService extends ConstantHelperService {

    service_name: string;

    constructor(private request: RequestService,
                public toastCtrl: ToastController) {
        super(toastCtrl);
        this.service_name = 'auth';
    }

    /**
     * @param {loginCredentials} credentials
     * @returns {Observable<any>}
     */
    login(credentials: loginCredentials): Observable<any> {
        const url = this.url('login');
        return this.request.post(url, credentials)
            .do(() => {
                },
                () => {
                    const msg = this.msg('login');
                    this.notification('error', msg)
                })
    }

    logout() {
        const url = this.url('logout');
        return this.request.get(url);
    }


}
