import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmedModalComponent } from './confirmed-modal/confirmed-modal.component';

@Component({
  selector: 'app-confirmed-data-view',
  templateUrl: './confirmed-data-view.component.html',
  styleUrls: ['./confirmed-data-view.component.scss']
})
export class ConfirmedDataViewComponent implements OnInit {

  public confirmedList = [
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    }, {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    }, {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    }, {
      doctor_name: "NAME NAME",
      first_name: "NAME",
      last_name: "NAME",
      email: "dfdf@rtrtt.com",
      phone_number: "03594569",
      date: '1/1/1998  09:10AM'
    }
  ]
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
  ) { }

  ngOnInit(): void {
  }

  addNewRequest(status: string) {
    this.dialogSer
      .open(ConfirmedModalComponent, {
        data: {
          status: status,
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }

      });
  }
}
