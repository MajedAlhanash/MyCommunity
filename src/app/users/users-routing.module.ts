import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsDataViewComponent } from './admins-data-view/admins-data-view.component';
import { ClinicAdminDataViewComponent } from './clinic-admin-data-view/clinic-admin-data-view.component';
import { UserDataViewComponent } from './user-data-view/user-data-view.component';
import { ClinicProfileDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-data-view.component';
import { ClinicProfileContentViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/clinic-profile-content-view/clinic-profile-content-view.component';
import { PostsDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/posts-data-view/posts-data-view.component';
import { StoriesDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/stories-data-view/stories-data-view.component';
import { RolesDataViewComponent } from './roles-data-view/roles-data-view.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ArchivesStoreDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/stories-data-view/archives-store-data-view/archives-store-data-view.component';
import { PendingDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/booking-data-view/pending-data-view/pending-data-view.component';
import { ConfirmedDataViewComponent } from './clinic-admin-data-view/clinic-profile-data-view/booking-data-view/confirmed-data-view/confirmed-data-view.component';
import { SettingsDataViewComponent } from './settings-data-view/settings-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserDataViewComponent
  },
  {
    path: 'admins',
    component: AdminsDataViewComponent
  },
  {
    path: 'roles',
    component: RolesDataViewComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'clinic-admins',
    component: ClinicAdminDataViewComponent
  },
  {
    path: 'settings',
    component: SettingsDataViewComponent
  },
  {
    path: 'clinic-admin/:id',
    component: ClinicProfileDataViewComponent,
    children:[
      {
        path:'',
        component: ClinicProfileContentViewComponent
      },
      {
        path:'stories',
        component: StoriesDataViewComponent
      },
      {
        path:'archives-stories',
        component: ArchivesStoreDataViewComponent
      },
      {
        path:'posts',
        component: PostsDataViewComponent
      },
      {
        path:'pending',
        component: PendingDataViewComponent
      },
      {
        path:'confirmed',
        component: ConfirmedDataViewComponent
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
