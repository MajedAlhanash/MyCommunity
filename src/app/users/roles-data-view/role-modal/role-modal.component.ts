import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  public roleForm!: FormGroup
  public dialogStatus!: string
  public selectedRole: any;

  allPermissions: any[] = []
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private roleSer: RoleService
  ) {
    this.roleForm = this._fb.group({
      name: ['', Validators.required],
      
    });
  }

  perIds: any[]=[];
  

  ngOnInit(): void {
    this.roleSer.getAllPermissions().subscribe(res => {
      this.allPermissions = res.dtos
    })

    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedRole = this.config.data.selectedRole
      if (this.dialogStatus === 'Edit') {
        console.log(this.selectedRole)
        this.roleForm.get('name')?.setValue(this.selectedRole.displayName);
        this.selectedRole.permissions.forEach((ele: any) => {
          this.perIds.push(ele.id)
        })
        console.log(this.perIds)
      }
    }
  }

  saveRole(role: any) {
    this._dialogRef.close(role)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

}
