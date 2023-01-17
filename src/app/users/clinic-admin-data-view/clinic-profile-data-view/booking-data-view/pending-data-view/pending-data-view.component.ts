import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PendingModalComponent } from './pending-modal/pending-modal.component';

@Component({
  selector: 'app-pending-data-view',
  templateUrl: './pending-data-view.component.html',
  styleUrls: ['./pending-data-view.component.scss']
})
export class PendingDataViewComponent implements OnInit {

  public pendingList = [
    {
      doctor_name:"Hamze",
      first_name:"Ghaith",
      last_name:"Bebars",
      email:"ghaith@gmail.com",
      phone_number:"0956554432",
      date: '1/1/2023  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },
    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    },    {
      doctor_name:"NAME NAME",
      first_name:"NAME",
      last_name:"NAME",
      email:"dfdf@rtrtt.com",
      phone_number:"03594569",
      date: '1/1/1998  09:10AM'
    }
  ]
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
  ) { }

  ngOnInit(): void {
  }


  addNewRequest(status: string, pending?: any){
    this.dialogSer
    .open(PendingModalComponent, {
      data: {
        status: status,
        pending: pending
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


  requestDetails(){}


}
