import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ClinicModalComponent } from './clinic-modal/clinic-modal.component';
import { ClinicResetPasswordModalComponent } from './clinic-reset-password-modal/clinic-reset-password-modal.component';

@Component({
  selector: 'app-clinic-admin-data-view',
  templateUrl: './clinic-admin-data-view.component.html',
  styleUrls: ['./clinic-admin-data-view.component.scss']
})
export class ClinicAdminDataViewComponent implements OnInit {

  public selectedClinic: any;
  public defultImg = 'assets/images/users/default.png';

  clinics = []

  constructor(
    public translate: TranslateService,
    public clinicService: ClinicsService,
    private dialogSer: DialogService,
    private router: Router,
    public loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.getAllCLinics()
  }

  getAllCLinics(){
    this.loading.showLoading()
    this.clinicService.getAllCLinics(1 , 100).subscribe(res=>{
        this.clinics = res.value;
        this.loading.hideLoading()

    })
  }

  test() {
    alert('hi')
  }

  //Create new admin
  openClinicModal(status: string) {
    this.dialogSer
      .open(ClinicModalComponent, {
        data: {
          status: status,
          selectedClinic: this.selectedClinic
        },
        header: status === 'Add' ? this.translate.instant('ADD_CLINIC') : this.translate.instant('EDIT_CLINIC'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        if (status === 'Add') {
          this.addNewClinic(result)
        } else {
          this.editClinic();
        }
      })
  }

  private addNewClinic(newClinic : any) { 
    this.clinicService.createNewClinic(newClinic).subscribe(res=>{
      console.log(res);
      
    })
  }
  private editClinic() { }

  public setSelectedClinic(clinic: any) {
    this.selectedClinic = clinic;
  }

  deleteClinic() {
    // let index = this.clinics.indexOf(this.selectedClinic);
    // this.clinics.splice(index, 1);
  }

  //------------------------------------------
  //------Reset password
  openResetPasswordModal() {
    this.dialogSer
      .open(ClinicResetPasswordModalComponent, {
        header: this.translate.instant('RESET_PASSWORD'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        this.clinicResetPassword()
      })
  }

  private clinicResetPassword() { }

  public goToClinicProfile(clinic:any){
    this.router.navigate(['/clinic-admin', clinic.id])
  }
}
