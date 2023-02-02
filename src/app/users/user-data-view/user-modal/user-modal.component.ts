import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})


export class UserModalComponent implements OnInit {

  public userForm!: FormGroup
  public dialogStatus!: string
  public selectedUser: any;
  public showUser!: boolean;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalFile: any;
  imageBase64: any;

  profileImageSrc = 'assets/images/users/default.png'

  //File uploader
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService
  ) {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      activeUser: [Boolean, Validators.required],
      image: []
    });
  }

  editing=false
  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedUser = this.config.data.selectedUser
      console.log(this.selectedUser)
      this.showUser = this.config.data.showUser;
      if (this.dialogStatus === 'Edit') {
        this.editing = true
        this.userForm.get('name')?.setValue(this.selectedUser.firstName);
        this.userForm.get('email')?.setValue(this.selectedUser.email);
        this.userForm.get('gender')?.setValue(this.selectedUser.gender === 0 ? '0' : '1');
        this.userForm.get('password')?.setValue(this.selectedUser.password);
        this.userForm.get('phone')?.setValue(this.selectedUser.phoneNumber);
        this.userForm.get('activeUser')?.setValue(this.selectedUser.isActive);
        /*if(this.selectedUser.active)
        
          this.userForm.get('activeUser')?.setValue('1');
        else
          this.userForm.get('activeUser')?.setValue('0');*/

      }

      if (this.showUser) {
        this.profileImageSrc = this.selectedUser.imagePath
        console.log(this.profileImageSrc)
        this.userForm.get('name')?.setValue(this.selectedUser.firstName);
        this.userForm.get('email')?.setValue(this.selectedUser.email);
        this.userForm.get('gender')?.setValue(this.selectedUser.gender === 0 ? 'male' : 'female');
        this.userForm.get('password')?.setValue(this.selectedUser.password);
        this.userForm.get('phone')?.setValue(this.selectedUser.phoneNumber);
        if (this.selectedUser.isActive)
          this.userForm.get('activeUser')?.setValue('Yes');
        else
          this.userForm.get('activeUser')?.setValue('No');
        this.userForm.disable()
      }
    }
  }

  saveUser(user: any) {
    this._dialogRef.close(user)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  file: any
  onFileChange(event: any) {
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      console.log(this.file[0])
      reader.readAsDataURL(this.file);
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

  imageCropped(event: ImageCroppedEvent) {
    this.imageBase64 = event.base64;
    let file = this.dataURLtoFile(this.imageBase64, 'photo.png');
    this.userForm.get('image')?.setValue(file);
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
    this.userForm.get('image')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
    };
    this.cropperClosed = true;
  }
}
