import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import {ClinicsService} from 'src/app/services/clinics/clinics.service'
@Component({
  selector: 'app-clinic-modal',
  templateUrl: './clinic-modal.component.html',
  styleUrls: ['./clinic-modal.component.scss'],
})
export class ClinicModalComponent implements OnInit {
  public clinicForm!: FormGroup;
  public dialogStatus!: string;
  public selectedClinic: any;
  public categories: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalFile: any;
  imageBase64: any;
  profileImageSrc = 'assets/images/users/default.png';
  //File uploader
  files: File[] = [];
  editing = true;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private categorySer: CategoriesService,
    private clinicService: ClinicsService
  ) {
    this.clinicForm = this._fb.group({
      clinicName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      website: [''],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      category: [],
      image: []
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.getAllCategories();
      this.dialogStatus = this.config.data.status;
      this.selectedClinic = this.config.data.selectedClinic;
      this.getClinicDetailsById(this.selectedClinic.id)
      
    }
  }
  

  getClinicDetailsById(id: any) {
    this.clinicService.getClinicDetailsById(id).subscribe(res => {
      this.selectedClinic = res.value
      if (this.dialogStatus === 'Edit') {
        this.editing = false
        console.log(this.selectedClinic)
        this.profileImageSrc = this.selectedClinic.imagePath;
        this.clinicForm.get('clinicName')?.setValue(this.selectedClinic.name);
        this.clinicForm.get('phone')?.setValue(this.selectedClinic.phoneNumber);
        this.clinicForm.get('website')?.setValue(this.selectedClinic.websiteUrl);
        this.clinicForm.get('category')?.setValue(this.selectedClinic.clinicCategories.categoryId);
      }
    })
  }
  getAllCategories() {
    this.categorySer.getAllCategories().subscribe(res => {
      this.categories = res.dtos
    })
  }

  saveAdmin(clinic: any) {
    this._dialogRef.close(clinic);
  }

  closeDialog() {
    this._dialogRef.close(null);
  }

  formData = new FormData();

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
    this.clinicForm.get('image')?.setValue(file);
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
