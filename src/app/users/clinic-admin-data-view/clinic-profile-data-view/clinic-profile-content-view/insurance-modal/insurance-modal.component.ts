import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-insurance-modal',
  templateUrl: './insurance-modal.component.html',
  styleUrls: ['./insurance-modal.component.scss']
})
export class InsuranceModalComponent implements OnInit {

  public insuranceForm!:FormGroup;
  public dialogStatus!: string
  public selectedInsurance: any;
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.insuranceForm = this._fb.group({
      name: ['', Validators.required],
      icon: [],
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedInsurance = this.config.data.selectedInsurance
      console.log(this.selectedInsurance)
      if (this.dialogStatus === 'Edit') {
        this.insuranceForm.get('name')?.setValue(this.selectedInsurance.name);
        this.insuranceForm.get('icon')?.setValue(this.selectedInsurance.icon);
      }
    }
  }

  saveInsurance(insurance: any) {
    console.log(insurance)
    this._dialogRef.close(insurance)
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
    this.insuranceForm.get('image')?.setValue(file);
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
    this.insuranceForm.get('image')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }
  
}
