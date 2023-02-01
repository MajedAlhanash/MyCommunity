import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
@Component({
  selector: 'app-edit-clinic-info',
  templateUrl: './edit-clinic-info.component.html',
  styleUrls: ['./edit-clinic-info.component.scss']
})
export class EditClinicInfoComponent implements OnInit {

  clinicData: any;
  descriptionText: string = '';
  public enableEdiDescription!: boolean;
  generalForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    image:new FormControl([])
  });

  constructor(private _dialogRef: DynamicDialogRef, private config: DynamicDialogConfig, private clinicService:ClinicsService) { }

  ngOnInit() {
    this.clinicData = this.config.data.clinicData;
    console.log(this.clinicData)
    this.imageBase64 = this.clinicData.imagePath
    this.descriptionText = this.clinicData.description;
    this.generalForm.controls.title.setValue(this.clinicData.clinicStyle)
    this.generalForm.controls.description.setValue(this.clinicData.description)
    this.generalForm.controls.phone.setValue(this.clinicData.phoneNumber)
    this.enableEdiDescription = true;
  }


  secondImageBase64: any;


  onFileChange2(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.formData.append('Icon', event.target.files[0])
      reader.readAsDataURL(file);

      reader.onload = () => {
        // convert image to base64 format
        this.secondImageBase64 = reader.result as string;
      };
    }
  }

  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBase64: any
  file:any

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
    this.formData.append('Image',file)
    this.generalForm.get('image')?.setValue(file as any);
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
    this.generalForm.get('image')?.setValue(this.file[0]);
    this.formData.append('Image',this.file[0])
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }

  formData = new FormData;
  editClinicInfo() {
    this.formData.append('Description', this.generalForm.controls.description.value || '');
    this.formData.append('ClinicStyle', this.generalForm.controls.title.value || '');
    this.formData.append('PhoneNumber', this.generalForm.controls.phone.value || '');
    this.formData.append('Id', this.clinicData.id);
    this.clinicService.updateClinic(this.formData).subscribe(res => {
      if(res){
        this._dialogRef.close()
      }
    })
  }

  closeDialog() {
    this._dialogRef.close()
  }
}
