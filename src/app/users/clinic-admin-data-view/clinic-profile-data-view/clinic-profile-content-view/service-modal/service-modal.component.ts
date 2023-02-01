import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {
  public serviceForm!: FormGroup;
  public dialogStatus!: string
  public selectedService: any;
  public clinicId!: number;
  //File uploader
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.serviceForm = this._fb.group({
      clinicId: [],
      icon: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      webSiteUrl: ['']
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.clinicId = +this.config.data.clinicId;
      this.serviceForm.get('clinicId')?.setValue(this.clinicId)      
      this.selectedService = this.config.data.selectedService
      if (this.dialogStatus === 'Edit') {
        this.imageBase64= this.selectedService.iconPath
        this.serviceForm.get('clinicId')?.setValue(this.selectedService.clinicId)
        this.serviceForm.get('name')?.setValue(this.selectedService.name);
        this.serviceForm.get('description')?.setValue(this.selectedService.description);
        this.serviceForm.get('webSiteUrl')?.setValue(this.selectedService.webSiteUrl);
        this.serviceForm.get('icon')?.setValue(this.selectedService.icon)
      }
    }
  }

  saveService(location: any) {
    console.log(location)
    this._dialogRef.close(location)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  
  imageChangedEvent: any = '';
  croppedImage: any = '';
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
    this.serviceForm.get('icon')?.setValue(file);
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
    this.serviceForm.get('icon')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }
}
