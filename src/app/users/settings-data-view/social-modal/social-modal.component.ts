import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-social-modal',
  templateUrl: './social-modal.component.html',
  styleUrls: ['./social-modal.component.scss']
})
export class SocialModalComponent implements OnInit {

  socialForm!:FormGroup;
  //File uploader
  files: File[] = [];
  public dialogStatus!: string
  public selectedAccount: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.socialForm = this._fb.group({
      name: [''],
      accountPlatform: ['', Validators.required],
      accountLink: ['', Validators.required],
      webSiteUrl: ['']
    });
  }

  ngOnInit(): void {
    if (this.config) {      
      this.dialogStatus = this.config.data.status;
      this.selectedAccount = this.config.data.selectedAccount
      if (this.dialogStatus === 'Edit') {
        this.socialForm.get('accountPlatform')?.setValue(this.selectedAccount.accountPlatform);
        this.socialForm.get('accountLink')?.setValue(this.selectedAccount.accountLink);
        this.socialForm.get('webSiteUrl')?.setValue(this.selectedAccount.webSiteUrl);

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
