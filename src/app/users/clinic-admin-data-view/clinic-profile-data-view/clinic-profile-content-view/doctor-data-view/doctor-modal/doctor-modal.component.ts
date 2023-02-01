import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import * as moment from 'moment';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceModalComponent } from '../../insurance-modal/insurance-modal.component';
@Component({
  selector: 'app-doctor-modal',
  templateUrl: './doctor-modal.component.html',
  styleUrls: ['./doctor-modal.component.scss']
})
export class DoctorModalComponent implements OnInit {

  doctorForm!: FormGroup;
  showDetails!: boolean;
  selectedDoctor: any;
  dialogStatus!: string
  insurancesList: any[] = []
  //File uploader
  files: File[] = [];
  insuranceFile: File[] = []
  jurisdictionFile: File[] = []
  clinicId: any
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private clinicService: ClinicsService,
    private dialogSer: DialogService,
    private confirmDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.doctorForm = this._fb.group({
      name: ['', Validators.required],
      workStartHour: ['', Validators.required],
      workEndHour: ['', Validators.required],
      clinicId: [],
      jurisdiction: [],
      jurisdictionIcon: [''],
      description: '',
      image: [],
      icon: [],
      webSiteUrl: [],
      insurances: [],
      insuranceIcon: ['']
    });
  }

  ngOnInit(): void {
    this.clinicId = this.config.data.clinicIdNumber;
    this.dialogStatus = this.config.data.status;
    this.clinicService.getClinicInsurances(this.clinicId).subscribe(res => {
      this.insurancesList = res.value
    })
    console.log(this.dialogStatus)
    if (this.config.data.selectedDoctor) {
      console.log(this.config.data.selectedDoctor)
      this.showDetails = this.config.data.showDetails
      this.clinicService.getDoctorDetails(this.config.data.selectedDoctor.id).subscribe(res => {
        this.selectedDoctor = res.value
        console.log(this.selectedDoctor)
        if (this.dialogStatus === 'Edit') {
          this.imageBase64 = this.selectedDoctor.imagePath
          this.iconBase64 = this.selectedDoctor.iconPath
          this.doctorForm.get('name')?.setValue(this.selectedDoctor.name);
          this.doctorForm.get('jurisdiction')?.setValue(this.selectedDoctor.jurisdiction)
          this.doctorForm.get('workStartHour')?.setValue(moment(this.selectedDoctor.workStartHour).format('HH:mm'))
          this.doctorForm.get('workEndHour')?.setValue(moment(this.selectedDoctor.workEndHour).format('HH:mm'))
          this.doctorForm.get('description')?.setValue(this.selectedDoctor.description)
          let insurancesIdArr: any[] = []
          this.selectedDoctor.insurances.forEach((ele: any) => {
            insurancesIdArr.push(ele.id)
          })
          console.log(insurancesIdArr)
          this.doctorForm.get('insurances')?.setValue(insurancesIdArr)
          // this.files.push(this.selectedDoctor.imagePath)
        }
      })
    }
  }

  saveDoctor(doctor: any) {
    this._dialogRef.close(doctor)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }


  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.doctorForm.get('image')?.setValue(this.files[this.files.length - 1])
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelectInsurance(event: any) {
    this.insuranceFile.push(...event.addedFiles);
    this.doctorForm.get('insuranceIcon')?.setValue(this.insuranceFile[this.insuranceFile.length - 1])
  }

  onSelectJurisdiction(event: any) {
    this.jurisdictionFile.push(...event.addedFiles);
    this.doctorForm.get('jurisdictionIcon')?.setValue(this.jurisdictionFile[this.jurisdictionFile.length - 1])
  }

  addNewInsurance() {
    this.dialogSer
      .open(InsuranceModalComponent, {
        data : {},
        autoZIndex: true,
        width: '600px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        console.log(result)
        if (!result) {
          return;
        }
        this.addNewInsurance1(result);
      });
  }
  
  addNewInsurance1(result: any) {
    var formData: any = new FormData();
    formData.append('Name', result?.name);
    formData.append('ClinicId', this.clinicId);
    formData.append('Icon', result?.icon);
    this.clinicService.createInsurances(formData).subscribe(res => {
      console.log(res)
      this.getClinicInsurances(this.clinicId)
    })
  }

  getClinicInsurances(clinicId: number) {
    this.clinicService.getClinicInsurances(clinicId).subscribe((res) => {
      this.insurancesList = res.value;
    });
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBase64: any
  iconBase64: any
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

  onFileChangeIcon(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        // convert image to base64 format
        this.iconBase64 = reader.result as string;
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
    this.doctorForm.get('image')?.setValue(file);
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
    this.doctorForm.get('image')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }
}
