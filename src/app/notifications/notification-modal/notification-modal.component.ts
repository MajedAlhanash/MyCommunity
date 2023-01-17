import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  public notificationForm!: FormGroup
   
  public userReceiver = [
    {
      label: 'All Users',
      value: 'all_users'
    },
    {
      label: 'All Clinics',
      value: 'all_Clinics'
    },
    {
      label: 'Custom Users',
      value: 'custom_users'
    },
    {
      label: 'Custom Clinics',
      value: 'custom_clinics'
    }
  ];

  public customUsers = [
    {
      name: 'aaa',
      id: 1
    },
    {
      name: 'aaa',
      id: 2
    },
    {
      name: 'aaa',
      id: 3
    },
    {
      name: 'marah',
      id: 4
    },
    {
      name: 'aaa',
      id: 1
    },
    {
      name: 'aaa',
      id: 2
    },
    {
      name: 'aaa',
      id: 3
    },
    {
      name: 'marah',
      id: 4
    },
    {
      name: 'aaa',
      id: 1
    },
    {
      name: 'aaa',
      id: 2
    },
    {
      name: 'aaa',
      id: 3
    },
    {
      name: 'marah',
      id: 4
    }
  ];

  users = [
    {
      name: 'aaa',
      id: 1
    },
    {
      name: 'aaa',
      id: 2
    },
    {
      name: 'aaa',
      id: 3
    },
    {
      name: 'marah',
      id: 4
    },
    {
      name: 'aaa',
      id: 1
    },
    {
      name: 'aaa',
      id: 2
    },
    {
      name: 'aaa',
      id: 3
    },
    {
      name: 'marah',
      id: 4
    },
    {
      name: 'aaa',
      id: 1
    },
    {
      name: 'aaa',
      id: 2
    },
    {
      name: 'aaa',
      id: 3
    },
    {
      name: 'marah',
      id: 4
    }
  ]

  public showCustomUsers: boolean = false;
  public showCustomClinics: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.notificationForm = this._fb.group({
      note_title: ['', Validators.required],
      note_desc: ['', Validators.required],
      receiver: []
    });
  }

  ngOnInit(): void {
  }

  onSelectReceiver(event: any[]) {
    this.showCustomUsers = event.includes('custom_users') ? true : false
    this.showCustomClinics = event.includes('custom_clinics') ? true : false

  }

  sendNotification(note: any) {
    this._dialogRef.close(note)
  }
  closeDialog() {
    this._dialogRef.close(null)
  }



  //------on Search custom users------------------
  onUserKey(value: any) {
    this.customUsers = [];    
    this.selectUserSearch(value.value);
  }

  selectUserSearch(value: string) {
    let filter = value.toLowerCase();    
    for (let i = 0; i < this.users.length; i++) {
      let option = this.users[i];      
      if (option.name.toLowerCase().indexOf(filter) >= 0) {
        this.customUsers.push(option);
      }
    }
  }



  //------on Search custom users------------------
  onClinicKey(value: any) {
    this.customUsers = [];    
    this.selectClinicSearch(value.value);
  }

  selectClinicSearch(value: string) {
    let filter = value.toLowerCase();    
    for (let i = 0; i < this.users.length; i++) {
      let option = this.users[i];      
      if (option.name.toLowerCase().indexOf(filter) >= 0) {
        this.customUsers.push(option);
      }
    }
  }

}
