import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { UsersService } from 'src/app/services/users/users.service';

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

  customUsers: any[] = [];
  customClinics: any[] = [];
  users: any[] = []

  public showCustomUsers: boolean = false;
  public showCustomClinics: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private userSer: UsersService,
    private clinicSer: ClinicsService
  ) {
    this.notificationForm = this._fb.group({
      note_title: ['', Validators.required],
      note_desc: ['', Validators.required],
      receiver: []
    });
  }

  ngOnInit(): void {
    this.userSer.getAllUsers().subscribe(res => {
      this.users = res.dtos
      this.customUsers = res.dtos
    })
    this.clinicSer.getAllCLinics().subscribe(res => {
      this.customClinics = res.dtos;
    })
  }

  type: any = 0
  onSelectReceiver(event: any[]) {
    this.showCustomUsers = event.includes('custom_users') ? true : false;
    this.showCustomClinics = event.includes('custom_clinics') ? true : false;
  }

  sendNotification(note: any) {
    if (note.receiver === 'all_users') {
      note['type']='3'
    }
    else if (note.receiver === 'all_Clinics') {
      note['type']='4'
    }
    else {
      note['type']='6'

    }
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
