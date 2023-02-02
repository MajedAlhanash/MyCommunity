import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataViewComponent } from './user-data-view/user-data-view.component';
import { ClinicAdminDataViewComponent } from './clinic-admin-data-view/clinic-admin-data-view.component';
import { AdminsDataViewComponent } from './admins-data-view/admins-data-view.component';
import { UsersRoutingModule } from './users-routing.module';

import { MaterialModule } from '../shared/material.module';
import { PrimengModule } from '../shared/primeng.module';
import { UserModalComponent } from './user-data-view/user-modal/user-modal.component';

import { UserResetPasswordModalComponent } from './user-data-view/user-reset-password-modal/user-reset-password-modal.component';
import { SharedModule } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AdminModalComponent } from './admins-data-view/admin-modal/admin-modal.component';
import { AdminResetPasswordModalComponent } from './admins-data-view/admin-reset-password-modal/admin-reset-password-modal.component';
import { ClinicModalComponent } from './clinic-admin-data-view/clinic-modal/clinic-modal.component';
import { ClinicResetPasswordModalComponent } from './clinic-admin-data-view/clinic-reset-password-modal/clinic-reset-password-modal.component';
import { ClinicProfileDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-data-view.component';
import { ClinicProfileContentViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/clinic-profile-content-view.component';
import { LocationModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/location-modal/location-modal.component';
import { ServiceModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/service-modal/service-modal.component';
import { InsuranceModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/insurance-modal/insurance-modal.component';
import { DoctorDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/doctor-data-view/doctor-data-view.component';
import { StoriesDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/stories-data-view/stories-data-view.component';
import { PostsDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/posts-data-view/posts-data-view.component';
import { StoryModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/stories-data-view/story-modal/story-modal.component';
import { RolesDataViewComponent } from './roles-data-view/roles-data-view.component';
import { RoleModalComponent } from './roles-data-view/role-modal/role-modal.component';
import { ArchivesStoreDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/stories-data-view/archives-store-data-view/archives-store-data-view.component';
import { DoctorModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/doctor-data-view/doctor-modal/doctor-modal.component';
import { BeforAndAfterModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/befor-and-after-modal/befor-and-after-modal.component';
import { PostModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/posts-data-view/post-modal/post-modal.component';
import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { PendingDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/booking-data-view/pending-data-view/pending-data-view.component';
import { ConfirmedDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/booking-data-view/confirmed-data-view/confirmed-data-view.component';
import { PendingModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/booking-data-view/pending-data-view/pending-modal/pending-modal.component';
import { ConfirmedModalComponent } from './clinic-admin-data-view/clinic-profile-data-view/booking-data-view/confirmed-data-view/confirmed-modal/confirmed-modal.component';
import { SettingsDataViewComponent } from './settings-data-view/settings-data-view.component';
import { SocialModalComponent } from './settings-data-view/social-modal/social-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditClinicInfoComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/editModal/edit-clinic-info/edit-clinic-info.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UserDataViewComponent,
    ClinicAdminDataViewComponent,
    AdminsDataViewComponent,
    UserModalComponent,
    UserResetPasswordModalComponent,
    AdminModalComponent,
    AdminResetPasswordModalComponent,
    ClinicModalComponent,
    ClinicResetPasswordModalComponent,
    ClinicProfileDataViewComponent,
    ClinicProfileContentViewComponent,
    LocationModalComponent,
    ServiceModalComponent,
    InsuranceModalComponent,
    DoctorDataViewComponent,
    StoriesDataViewComponent,
    PostsDataViewComponent,
    StoryModalComponent,
    RolesDataViewComponent,
    RoleModalComponent,
    ArchivesStoreDataViewComponent,
    DoctorModalComponent,
    BeforAndAfterModalComponent,
    PostModalComponent,
    PendingDataViewComponent,
    ConfirmedDataViewComponent,
    PendingModalComponent,
    ConfirmedModalComponent,
    SettingsDataViewComponent,
    SocialModalComponent,
    EditClinicInfoComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    GooglePlaceModule,
    HttpClientModule,
    HttpClientJsonpModule,
    UsersRoutingModule,
    SharedModule,
    ImageCropperModule,
    MaterialModule,
    PrimengModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    GalleryModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class UsersModule { }
