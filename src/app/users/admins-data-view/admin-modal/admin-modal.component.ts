import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit {

  public adminForm!: FormGroup
  public dialogStatus!: string
  public selectedAdmin: any;

  profileImageSrc = 'assets/images/users/default.png'

  //File uploader
  files: File[] = [];
  public RolesList= [
    {
      label: 'User',
      value: 'user'
    },
    {
      label: 'Clinic Admin',
      value: 'clinic_admin'
    },
    {
      label: 'Categories',
      value: 'categories'
    },
    {
      label: 'Notifications',
      value: 'notifications'
    },
    {
      label: 'Super Admin',
      value: 'super_admin'
    }
  ]

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.adminForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      renew_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedAdmin = this.config.data.selectedAdmin
      if (this.dialogStatus === 'Edit') {
        this.adminForm.get('name')?.setValue(this.selectedAdmin.name);
        this.adminForm.get('email')?.setValue(this.selectedAdmin.email);
      }
    }
  }

  saveAdmin(admin: any) {
    this._dialogRef.close(admin)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
