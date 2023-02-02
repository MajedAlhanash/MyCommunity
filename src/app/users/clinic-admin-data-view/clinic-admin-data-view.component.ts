import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/services/categories/categories.service';
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
  categories = []
  constructor(
    public translate: TranslateService,
    public clinicService: ClinicsService,
    public categoryService: CategoriesService,
    private dialogSer: DialogService,
    private router: Router,
    public loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.getAllCLinics()
  }

  getAllCLinics() {
    this.loading.showLoading()
    this.clinicService.getAllCLinics().subscribe(res => {
      this.clinics = res.dtos;
      this.loading.hideLoading();
    })
  }

  test(text: any) {
    this.clinicService.searchClinicByName(text).subscribe(res => {
      this.clinics = res.dtos;
    })
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
          this.editClinic(result);
        }
      })
  }

  editClinicModal(admin: any) {
    console.log(admin)
  }

  addNewClinic(clinic: any) {
    let formData = new FormData();
    formData.append('UserName', clinic.userName);
    formData.append('ClinicName', clinic.clinicName);
    formData.append('Email', clinic.email);
    formData.append('Password', clinic.password);
    formData.append('ClinicPhoneNumber', clinic.phone);
    formData.append('CategoryIds', clinic.category);
    formData.append('ClinicImage', clinic.image)
    this.clinicService.createNewClinic(formData).subscribe(res => {
      console.log(res);
      this.getAllCLinics()
    })
  }
  private editClinic(clinic: any) {
    let formData = new FormData();
    formData.append('Name', clinic.clinicName);
    formData.append('PhoneNumber', clinic.phone);
    formData.append('CategoryIds', clinic.category);
    formData.append('ClinicWebSiteUrl', clinic.website);
    formData.append('Id', this.selectedClinic.id)
    formData.append('Image', clinic.image);
    this.clinicService.updateClinic(formData).subscribe(res => {
      console.log(res)
      this.getAllCLinics()
    })
  }

  public setSelectedClinic(clinic: any) {
    this.selectedClinic = clinic;
  }

  deleteClinic() {
    console.log(this.selectedClinic)
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
        console.log(result)
        if (!result) {
          return
        }
        this.clinicResetPassword()
      })
  }

  private clinicResetPassword() { }

  public goToClinicProfile(clinic: any) {
    this.router.navigate(['/clinic-admin', clinic.id])
  }
}
