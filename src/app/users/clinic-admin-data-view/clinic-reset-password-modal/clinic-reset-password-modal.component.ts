import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-clinic-reset-password-modal',
  templateUrl: './clinic-reset-password-modal.component.html',
  styleUrls: ['./clinic-reset-password-modal.component.scss']
})
export class ClinicResetPasswordModalComponent implements OnInit {
  public resetAdminPasswordForm!: FormGroup
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.resetAdminPasswordForm = this._fb.group({
      new_password: ['', Validators.required],
      renew_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveResetPassword(resetAdminPasswordForm: any) {
    this._dialogRef.close(resetAdminPasswordForm)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }
}
