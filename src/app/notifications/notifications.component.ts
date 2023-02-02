import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from '../services/loading/loading.service';
import { NotificationsService } from '../services/notifications.service';
import { DisplayCustomUsersComponent } from './display-custom-users/display-custom-users.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = []
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService,
    private notiService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.loading.showLoading();
    this.notiService.getAllNotifications().subscribe(res => {
      this.notifications = res.dtos;
      console.log(res)
      this.loading.hideLoading()
    })
  }

  openNotificationModal() {
    this.dialogSer
      .open(NotificationModalComponent, {
        header: this.translate.instant('SEND_NEW_NOTIFICATION'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
        this.sendNewNotification(result);
      });
  }

  noteClicicked(note:any){
    console.log(note)
    this.notiService.getCustomUsers(note.id).subscribe(res => {
      this.dialogSer.open(DisplayCustomUsersComponent , {
        data: {
          list: res,
        },
        width:'600px',
        autoZIndex:true
        
      }).onClose.subscribe((result)=>{

      })
      console.log(res)
    })
  }

  private sendNewNotification(result: any) {
    let modal = {
      body: result.note_desc,
      title: result.note_title,
      type: +result.type,
      userIds: (result.receiver === 'all_users' || result.receiver === 'all_Clinics') ? [] : result.receiver
    }
    this.notiService.createNotification(modal).subscribe(res => {
      console.log(res)
    })
  }

  search(text: any) {
    this.notiService.searchNotificationByName(text).subscribe(res => {
      this.notifications = res.dtos;
    })
  }
}
