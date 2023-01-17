import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-reset-password-modal',
  templateUrl: './user-reset-password-modal.component.html',
  styleUrls: ['./user-reset-password-modal.component.scss']
})
export class UserResetPasswordModalComponent implements OnInit {

  public resetUserPasswordForm!: FormGroup
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.resetUserPasswordForm = this._fb.group({
      new_password: ['', Validators.required],
      renew_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveResetPassword(resetUserPasswordForm: any) {
    this._dialogRef.close(resetUserPasswordForm)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }


}
