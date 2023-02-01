import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { DoctorModalComponent } from './doctor-modal/doctor-modal.component';

@Component({
  selector: 'app-doctor-data-view',
  templateUrl: './doctor-data-view.component.html',
  styleUrls: ['./doctor-data-view.component.scss']
})
export class DoctorDataViewComponent implements OnInit {


  public doctorList!:any;
  clinicId:any
  public defultImg = 'assets/images/users/default.png';
  selectedDoctor: any;

  constructor(
    private _dialogRef: DynamicDialogRef,
    private dialogSer: DialogService,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private clinicService:ClinicsService
  ) { }

  ngOnInit(): void {
    console.log(this.config);
    
    if (this.config.data) {
      this.doctorList = this.config.data.doctorsList
      this.clinicId = this.config.data.clinicIdNumber
      console.log(this.doctorList)
    }
  }


  setSelectedDoctor(doctor:any){
    this.selectedDoctor = doctor
  }

  openDoctorModal(status:string){
    this.dialogSer
    .open(DoctorModalComponent, {
      data:{
        status: status,
        selectedDoctor: this.selectedDoctor,
        clinicIdNumber:this.clinicId,
        showDetails: false
      },
      autoZIndex: true,
      width: '500px',
      showHeader:false,
      closeOnEscape:true,
    })
    .onClose.subscribe((result) => {
      if (!result) {
        return
      }
      if (status === 'Add') {
        this.addNewDoctor()
      }else{
        this.editDoctor();
      }
    })
  }
  addNewDoctor(){}
  editDoctor(){}
  deleteDoctor(){
    console.log(this.selectedDoctor)
    this.clinicService.deleteDoctor(this.selectedDoctor.id).subscribe(res => {
      console.log(res)
    })
  }


  public showDoctorDetails(doctor:any){
    this.dialogSer
    .open(DoctorModalComponent, {
      data:{
        selectedDoctor:doctor,
        showDetails: true
      },
      autoZIndex: true,
      width: '500px',
      showHeader:false,
      closeOnEscape:true,
    })
    .onClose.subscribe((result) => {
      if (!result) {
        return
      }
    })
  }

  closeDialog() {
    this._dialogRef.close(null)
  }
}
