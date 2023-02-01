import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { base64ToFile, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-social-modal',
  templateUrl: './social-modal.component.html',
  styleUrls: ['./social-modal.component.scss']
})
export class SocialModalComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  socialForm!: FormGroup;
  selectedValue: string = ' '
  //File uploader
  files: File[] = [];
  public dialogStatus!: string
  public selectedAccount: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private settingSer: SettingsService
  ) {
    this.socialForm = this._fb.group({
      accountPlatform: ['', Validators.required],
      accountLink: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      webSiteUrl: [''],
      type: ['', Validators.required],
      image: []
    });
  }

  ngOnInit(): void {
    console.log(this.selectedValue)
    if (this.config) {
      this.dialogStatus = this.config.data.status;
      this.selectedAccount = this.config.data.selectedAccount
      this.imageBase64 = this.selectedAccount.iconPath;
      console.log(this.selectedAccount)
      if (this.dialogStatus === 'Edit') {
        this.socialForm.get('accountPlatform')?.setValue(this.selectedAccount.accountPlatform);
        this.socialForm.get('accountLink')?.setValue(this.selectedAccount.accountLink);
        this.socialForm.get('webSiteUrl')?.setValue(this.selectedAccount.webSiteUrl);

      }
    }
  }

  formData = new FormData();
  saveAdmin(admin: any) {
    this._dialogRef.close(admin)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  changeSelection(event: any) {
    this.selectedValue = event.toString();
    this.socialForm.get('type')?.setValue(this.selectedValue);
  }

  imageBase64: any
  file: any
  onFileChange(event: any) {
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        // convert image to base64 format
        this.imageBase64 = reader.result as string;
      };
    }
  }

  dataURLtoFile(dataurl: any, filename: any) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  finalFile: any;
  imageCropped(event: ImageCroppedEvent) {
    this.imageBase64 = event.base64;
    let file = this.dataURLtoFile(this.imageBase64, 'photo.png');
    this.socialForm.get('image')?.setValue(file);
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  cropperClosed = false;
  closeCropper(event: any) {
    event.preventDefault();
    this.cropperClosed = true;
  }

  resetCropper(event: any) {
    event.preventDefault();
    console.log(this.file[0])
    this.socialForm.get('image')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }
}
