import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  public roleForm!: FormGroup
  public dialogStatus!: string
  public selectedRole: any;
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
    this.roleForm = this._fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedRole = this.config.data.selectedRole
      if (this.dialogStatus === 'Edit') {
        this.roleForm.get('name')?.setValue(this.selectedRole.name);
        this.roleForm.get('role')?.setValue(this.selectedRole.role);
      }
    }
  }

  saveRole(role:any){
    this._dialogRef.close(role)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

}
