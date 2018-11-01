import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";
import {Network} from "@ionic-native/network";
import {ConstantHelperService} from "../base/constant-helper.service";

@Injectable()

export class ConnectionService extends ConstantHelperService {

    constructor(public request: RequestService, public toast: ToastController, private network: Network) {
        super(toast);
        this.service_name = 'connection';
    }

    startMonitoringConnection() {
        this.network.onConnect().subscribe(() => {
            this.notification('success', this.msg('onConnect'));
        }, error => console.error(error));

        this.network.onDisconnect().subscribe(() => {
            this.notification('error', this.msg('onDisconnect'));
        }, error => console.error(error));

    }

}