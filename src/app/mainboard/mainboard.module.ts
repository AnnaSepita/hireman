//ionic-angular module
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule} from 'ionic-angular';
import {HttpClientModule} from "@angular/common/http";
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {IonicStorageModule} from "@ionic/storage";

//ionic-cordova-native
import {FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Camera} from '@ionic-native/camera';
import {Crop} from "@ionic-native/crop";
import {Base64} from "@ionic-native/base64";
import {Contacts, Contact} from "@ionic-native/contacts";

//components
import {MainboardComponent} from "./mainboard.component";

import {JobListComponent} from "./job-list/job-list.component";
import {FriendComponent} from "./friend/friend.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserInfoComponent} from "./profile/user-info/user-info.component";
import {SkillComponent} from "./profile/user-skills/skill.component";
import {UserSkillRangeComponent} from "./profile/user-skill-range/user-skill-range.component";
import {SkillListComponent} from "./profile/skill-list-modal/skill-list.component";
import {InfoComponent} from "./info/info.component";
import {AboutUsComponent} from "./info/about-us/about-us.component";
import {SupportComponent} from "./info/support/support.component";
import {PhoneContactsComponent} from "./friend/phone-contacts.component/phone-contacts.component";
import {ShareJobComponent} from "./job-list/share-job-modal/share-job.component";

//services
import {JobService} from "../shared/services/all-job.service";
import {MyJobService} from "../shared/services/my-job.service";
import {UserSkillsService} from "../shared/services/user-skills.service";
import {CameraService} from "../shared/services/camera.service";
import {SkillListService} from "../shared/services/skill-list.service";
import {FriendService} from "../shared/services/friend.service";
import {CountService} from "../shared/services/count.service";

// pipes
import {OrderModule} from "ngx-order-pipe";



@NgModule({
  declarations: [
    MainboardComponent,
    JobListComponent,
    FriendComponent,
    ProfileComponent,
    UserInfoComponent,
    SkillComponent,
    SkillListComponent,
    UserSkillRangeComponent,
    InfoComponent,
    AboutUsComponent,
    SupportComponent,
    PhoneContactsComponent,
    ShareJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MainboardComponent),
    IonicStorageModule.forRoot(),
    LoadingBarHttpClientModule,
    OrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MainboardComponent,
    JobListComponent,
    FriendComponent,
    ProfileComponent,
    UserInfoComponent,
    SkillComponent,
    SkillListComponent,
    UserSkillRangeComponent,
    InfoComponent,
    AboutUsComponent,
    SupportComponent,
    PhoneContactsComponent,
    ShareJobComponent
  ],
  providers: [
    JobService,
    MyJobService,
    UserSkillsService,
    FileTransferObject,
    File,
    Camera,
    CameraService,
    Crop,
    Base64,
    SkillListService,
    FriendService,
    CountService,
    Contacts,
    Contact
  ]
})
export class MainboardModule {
}
