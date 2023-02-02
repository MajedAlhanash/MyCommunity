import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-befor-and-after-modal',
  templateUrl: './befor-and-after-modal.component.html',
  styleUrls: ['./befor-and-after-modal.component.scss']
})
export class BeforAndAfterModalComponent implements OnInit {

  showDetails!:boolean;
  selectedData:any;
  dialogStatus!:string
  beforAndAfterForm!:FormGroup
    //File uploader
    files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.beforAndAfterForm = this._fb.group({
      text: [],
      image:[]
    })
  }

  ngOnInit(): void {
    if (this.config) {
      this.showDetails = this.config.data.showDetails;
      this.selectedData = this.config.data.selectedData
      this.dialogStatus = this.config.data.status;
      if (this.dialogStatus === 'Edit') {        
        this.beforAndAfterForm.get('text')?.setValue(this.selectedData.text)
      }
      
    }
  }


  saveBeforAndAter(beforAndAfterForm:any){
    this._dialogRef.close(beforAndAfterForm)
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
    this.beforAndAfterForm.get('image')?.setValue(file);
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
    this.beforAndAfterForm.get('image')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }
}
