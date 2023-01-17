import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { DoctorModalComponent } from './doctor-modal/doctor-modal.component';

@Component({
  selector: 'app-doctor-data-view',
  templateUrl: './doctor-data-view.component.html',
  styleUrls: ['./doctor-data-view.component.scss']
})
export class DoctorDataViewComponent implements OnInit {

  public doctorList!:any;
  public defultImg = 'assets/images/users/default.png';
  selectedDoctor: any;

  constructor(
    private _dialogRef: DynamicDialogRef,
    private dialogSer: DialogService,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    console.log(this.config.data);
    
    if (this.config.data) {
      this.doctorList = this.config.data.doctorsList
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
  deleteDoctor(){}


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
