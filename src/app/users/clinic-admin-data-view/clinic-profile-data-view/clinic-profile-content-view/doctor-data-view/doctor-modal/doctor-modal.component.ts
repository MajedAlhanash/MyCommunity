import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

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

  //File uploader
  files: File[] = [];
  insuranceFile: File[] = []

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.doctorForm = this._fb.group({
      name: ['', Validators.required],
      workStartHour: ['', Validators.required],
      workEndHour: ['', Validators.required],
      clinicId: [],
      jurisdiction: [],
      description: [],
      image: [],
      icon: [],
      webSiteUrl: [],
      insurances: [''],
      insuranceIcon: ['']
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.showDetails = this.config.data.showDetails
      this.dialogStatus = this.config.data.status;
      this.selectedDoctor = this.config.data.selectedDoctor
      if (this.showDetails) {
        this.doctorForm.get('name')?.setValue(this.selectedDoctor.name);
        this.doctorForm.get('jurisdiction')?.setValue(this.selectedDoctor.jurisdiction)
        // this.files.push(this.selectedDoctor.imagePath)
        this.doctorForm.disable()
      }
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
    this.doctorForm.get('image')?.setValue(this.files[0])
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelectInsurance(event: any){
    this.insuranceFile.push(...event.addedFiles);
    this.doctorForm.get('insuranceIcon')?.setValue(this.insuranceFile[0])
  }
}
