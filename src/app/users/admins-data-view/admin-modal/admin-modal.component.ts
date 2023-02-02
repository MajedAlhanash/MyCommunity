import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit {

  public adminForm!: FormGroup
  public dialogStatus!: string
  public selectedAdmin: any;


  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalFile: any;
  imageBase64: any;
  profileImageSrc = 'assets/images/users/default.png'

  //File uploader
  files: File[] = [];
  public RolesList: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private roleSer: RoleService
  ) {
    this.adminForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      renew_password: ['', Validators.required],
      role: [],
      isActive: ['', Validators.required],
      image: [],
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedAdmin = this.config.data.selectedAdmin
      console.log(this.selectedAdmin)
      if (this.dialogStatus === 'Edit') {
        this.imageBase64 = this.selectedAdmin.imagePath
        this.adminForm.get('firstName')?.setValue(this.selectedAdmin.firstName);
        this.adminForm.get('lastName')?.setValue(this.selectedAdmin.lastName);
        this.adminForm.get('email')?.setValue(this.selectedAdmin.email);
        this.adminForm.get('isActive')?.setValue(this.selectedAdmin.isActive === true ? '1' : '0');
        this.adminForm.get('phoneNumber')?.setValue(this.selectedAdmin.phoneNumber);
      }
    }
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleSer.getAllRoles().subscribe(res => {
      this.RolesList = res.dtos
      console.log(res.dtos)
    })
  }

  saveAdmin(admin: any) {
    this._dialogRef.close(admin)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  onFileChange(event: any) {
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

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

  imageCropped(event: ImageCroppedEvent) {
    this.imageBase64 = event.base64;
    let file = this.dataURLtoFile(this.imageBase64, 'photo.png');
    this.adminForm.get('image')?.setValue(file);
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
}
