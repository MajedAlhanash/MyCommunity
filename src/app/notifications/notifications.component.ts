import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from '../services/loading/loading.service';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications = [
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrtdrttrtdrttrtdrttrtdrttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrtdrttrtdrttrtdrttrtdrtdrttrtdrttrttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrtdrttrtdrttrtdrttdrttrtdrttrtdrttrtdrttrtdrttrtrtdrttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrtdrttrtdrttrtdrttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrtdrttrtdrttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    },
    {
      name: 'mais mais',
      sending_date: '1-1-1111',
      message: 'sfdrtrtfg',
      content: 'drttrt'
    }
  ]
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService

  ) { }

  ngOnInit(): void {
    this.loading.showLoading();
    setTimeout(() => {
      this.loading.hideLoading()
    }, 100);
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
        this.sendNewNotification();
      });
  }

  private sendNewNotification() { }
}
