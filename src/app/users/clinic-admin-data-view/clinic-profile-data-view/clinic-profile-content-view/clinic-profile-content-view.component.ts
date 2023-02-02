import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { InsuranceModalComponent } from './insurance-modal/insurance-modal.component';
import { DoctorDataViewComponent } from './doctor-data-view/doctor-data-view.component';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { DoctorModalComponent } from './doctor-data-view/doctor-modal/doctor-modal.component';
import { BeforAndAfterModalComponent } from './befor-and-after-modal/befor-and-after-modal.component';
import { EditClinicInfoComponent } from './editModal/edit-clinic-info/edit-clinic-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/users/confirm/confirm.component';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-clinic-profile-content-view',
  templateUrl: './clinic-profile-content-view.component.html',
  styleUrls: ['./clinic-profile-content-view.component.scss'],
})
export class ClinicProfileContentViewComponent implements OnInit, OnChanges {
  public tapIndex: number = 0;
  public clinicId: any;
  public enableEditing!: boolean;
  public enableEdiDescription!: boolean;

  //Selected options
  public selectedClinic: any;
  public selectedLocation: any;
  public selectedService: any;
  public selectedInsurance: any;
  public selectedBefor: any;

  public locationList = [];
  public servicesList = [];
  public InsuranceList = [];
  public doctorsList = [];
  public beforAndAfterList = [];

  //For Edit Options
  // public applyEditLocation: boolean = false;
  // public applyEditServices: boolean = false;
  // public applyEditInsurance: boolean = false;
  // public applyEditDescription: boolean = false;

  public defultImg = 'assets/images/users/default.png';
  public ratingValue: number = 3;

  public descriptionText: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut   aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum. ad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
  ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
  officia deserunt mollit anim id est laborum.`;

  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    private clinicsService: ClinicsService,
    private loading: LoadingService,
    private confirmDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    var numb = this.router.url.match(/\d/g);
    this.clinicId = numb?.join('')
    if (this.clinicId) {
      this.loading.showLoading();
      this.getCLinicDetails(this.clinicId);
      this.getClinicLocations(this.clinicId);
      this.getClinicServices(this.clinicId);
      this.getClinicInsurances(this.clinicId);
      this.getClinicBeforAndAfter(this.clinicId, 1, 100);
    }
  }
  onChangeTap(e: any) {
    console.log(e);
  }

  getCLinicDetails(id: number) {
    this.clinicsService.getClinicDetailsById(id).subscribe((res) => {
      this.selectedClinic = res.value;
      console.log(this.selectedClinic)
      this.doctorsList = this.selectedClinic?.doctors;
    });
  }

  onClickEditDescription(selectedClinic: any) {
    console.log(selectedClinic)
    this.dialogSer.open(EditClinicInfoComponent, {
      autoZIndex: true,
      width: '600px',
      showHeader: false,
      closeOnEscape: true,
      data: {
        clinicData: selectedClinic,
        onClickEditDescription: true,
      }
    })
    this.enableEdiDescription = true;
    this.descriptionText = this.selectedClinic.description
  }

  //---------------------BeforAndAfter Modal----------------------------------

  getClinicBeforAndAfter(clinicId: number, pageId: number, pageCount: number) {
    this.clinicsService
      .getBeforAndAfter(clinicId, pageId, pageCount)
      .subscribe((res) => {
        this.beforAndAfterList = res.value;
      });
  }

  setSelectedbeforAndAfter(beforAndAfter: any) {
    this.selectedBefor = beforAndAfter;
  }

  beforAndAfterModal(status: string) {
    this.dialogSer
      .open(BeforAndAfterModalComponent, {
        data: {
          status: status,
          selectedData: this.selectedBefor,
        },
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
        if (status === 'Add') {
          this.addNewBeforAndAfter(result);
        } else {
          this.editBeforAndAfter();
        }
      });
  }

  private addNewBeforAndAfter(result: any) {
    var formData = new FormData();
    formData.append('Text', result.text)
    formData.append('Image', result.image)
    formData.append('ClinicId', this.selectedClinic.id)
    this.clinicsService.createNewBeforeAndAfter(formData).subscribe(res => {
      console.log(res)
      this.getClinicBeforAndAfter(this.clinicId, 1, 100);
    })
  }
  private editBeforAndAfter() { }

  beforAndAfterDetails(beforAndAfter: any) {
    this.dialogSer
      .open(BeforAndAfterModalComponent, {
        data: {
          showDetails: true,
          selectedData: beforAndAfter,
        },
        autoZIndex: true,
        width: '600px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
      });
  }

  deleteBeforeAndAfter() {
    this.clinicsService.deleteNewBeforeAndAfter(this.selectedBefor.id).subscribe(res => {
      console.log(res)
      this.getClinicBeforAndAfter(this.clinicId, 1, 100);
    })
  }
  //---------------------Location Modal----------------------------------
  getClinicLocations(clinicId: number) {
    console.log(clinicId)
    this.clinicsService.getClinicLocation(clinicId).subscribe((res) => {
      this.locationList = res.value;
      this.loading.hideLoading();
    });
  }

  setSelectedLocation(location: any) {
    this.selectedLocation = location;
    console.log(this.selectedLocation)
  }

  openLocationModal(status: string) {
    this.dialogSer
      .open(LocationModalComponent, {
        data: {
          status: status,
          selectedLocation: this.selectedLocation,
        },
        width: '600px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewLocation(result);
        } else {
          this.editLocation();
        }
      });
  }

  private addNewLocation(result:any) { 
    this.clinicsService.createLocation(result).subscribe(res => {
      console.log(res)
      this.getClinicLocations(this.clinicId)
    })
  }
  private editLocation() { }

  deleteLocation() {
    let dialog = this.confirmDialog.open(ConfirmComponent, {
      width: "40%"
    })
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.clinicsService.deleteLocation(this.selectedLocation.id).subscribe(res => {
          this.getClinicLocations(this.clinicId);
          console.log(res)
        })
      }
    });
  }

  //---------------------Service Modal----------------------------------
  getClinicServices(clinicId: number) {
    this.clinicsService.getClinicServices(clinicId).subscribe((res) => {
      this.servicesList = res.value;
      this.loading.hideLoading();
    });
  }

  setSelectedService(service: any) {
    this.selectedService = service;
    console.log(this.selectedService)
  }

  openServicesModal(status: string) {
    this.dialogSer
      .open(ServiceModalComponent, {
        data: {
          status: status,
          clinicId: this.clinicId,
          selectedService: this.selectedService,
        },
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
        if (status === 'Add') {
          this.addNewService(result);
        } else {
          this.editService(result);
        }
      });
  }

  private addNewService(newService: any) {
    var formData: any = new FormData();
    formData.append('Name', newService?.name);
    formData.append('ClinicId', newService?.clinicId);
    formData.append('Icon', newService?.icon);
    formData.append('Description', newService?.description);
    formData.append('webSiteUrl', newService?.webSiteUrl);
    this.clinicsService.createService(formData).subscribe((res) => {
      this.getClinicServices(this.clinicId);
      console.log(res);
    });
  }
  private editService(editService: any) {
    var formData: any = new FormData();
    formData.append('Name', editService?.name);
    formData.append('Id', this.selectedService.id);
    formData.append('Icon', editService?.icon);
    formData.append('Description', editService?.description);
    formData.append('WebSiteUrl', editService?.webSiteUrl);
    this.clinicsService.updateService(formData).subscribe(res => {
      this.getClinicServices(this.clinicId);
      console.log(res)
    })
  }
  public deleteService() {
    let dialog = this.confirmDialog.open(ConfirmComponent, {
      width: "40%"
    })
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.clinicsService.deleteService(this.selectedService.id).subscribe(res => {
          this.getClinicServices(this.clinicId);
          console.log(res)
        })
      }
    });
  }

  //---------------------Insurance Modal----------------------------------
  getClinicInsurances(clinicId: number) {
    this.clinicsService.getClinicInsurances(clinicId).subscribe((res) => {
      this.InsuranceList = res.value;
      console.log(this.InsuranceList)
      this.loading.hideLoading();
    });
  }

  setSelectedInsurance(Insurance: any) {
    this.selectedInsurance = Insurance;
  }

  openInsuranceModal(status: string) {
    this.dialogSer
      .open(InsuranceModalComponent, {
        data: {
          status: status,
          selectedInsurance: this.selectedInsurance,
        },
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
        if (status === 'Add') {
          this.addNewInsurance(result);
        } else {
          this.editInsurance();
        }
      });
  }

  private addNewInsurance(result: any) {
    var formData: any = new FormData();
    formData.append('Name', result?.name);
    formData.append('ClinicId', this.selectedClinic.id);
    formData.append('Icon', result?.icon);
    this.clinicsService.createInsurances(formData).subscribe(res => {
      this.getClinicInsurances(this.clinicId);
      console.log(res)
    })
  }
  private editInsurance() { }
  public deleteInsurance() {
    let dialog = this.confirmDialog.open(ConfirmComponent, {
      width: "40%"
    })
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.clinicsService.deleteInsurance(this.selectedInsurance.id).subscribe(res => {
          this.getClinicInsurances(this.clinicId);
          console.log(res)
        })
      }
    });
  }

  /////----------------Doctor Modal-----------------------

  openDoctorModal(status: string) {
    this.dialogSer
      .open(DoctorModalComponent, {
        data: {
          status: status,
          selectedDoctor: this.selectedDoctor,
          clinicIdNumber: this.clinicId,
          showDetails: false
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        if (status === 'Add') {
          this.addNewDoctor(result)
        } else {
          this.editDoctor(result, this.selectedDoctor);
        }
      })
  }

  addNewDoctor(doctor: any) {
    console.log(doctor)
    let formData = new FormData();
    formData.append('Name', doctor.name);
    formData.append('WorkStartHour', doctor.workStartHour);
    formData.append('WorkEndHour', doctor.workEndHour);
    formData.append('Jurisdiction', doctor.jurisdiction);
    formData.append('Description', doctor.description);
    formData.append('Insurances', doctor.insurances);
    formData.append('Image', doctor.image)
    formData.append('Icon', doctor.insuranceIcon)
    formData.append('ClinicId', this.clinicId);
    this.clinicsService.addNewDoctor(formData).subscribe(res => {
      console.log(res)
      this.getCLinicDetails(this.clinicId);
    })
  }

  editDoctor(doctor: any, selectedData: any) {
    console.log(doctor)
    console.log(selectedData)
    let formData = new FormData();
    formData.append('Name', doctor.name);
    formData.append('WorkStartHour', doctor.workStartHour);
    formData.append('WorkEndHour', doctor.workEndHour);
    formData.append('Jurisdiction', doctor.jurisdiction);
    formData.append('Description', doctor.description);
    formData.append('Insurances', doctor.insurances);
    formData.append('Image', doctor.image)
    formData.append('Icon', doctor.insuranceIcon)
    formData.append('Id', selectedData.id);

    this.clinicsService.updataDoctor(formData).subscribe(res =>{
      console.log(res)
      this.getCLinicDetails(this.clinicId);
    })
  }

  public onEditDoctor() {
    console.log(this.selectedClinic.id)
    this.dialogSer
      .open(DoctorDataViewComponent, {
        data: {
          doctorsList: this.doctorsList,
          clinicIdNumber: this.selectedClinic.id
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
      });
  }
  selectedDoctor: any
  setSelectedDoctor(doctor: any) {
    this.selectedDoctor = doctor
  }

  public showDoctorDetails(doctor: any) {
    this.dialogSer
      .open(DoctorModalComponent, {
        data: {
          selectedDoctor: doctor,
          showDetails: true
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        console.log(result)
        if (!result) {
          console.log('there is no result')
          return;
        }
      });
  }

  deleteDoctor() {
    this.clinicsService.deleteDoctor(this.selectedDoctor.id).subscribe(res =>{
      console.log(res)
      this.getCLinicDetails(this.clinicId);
    })
  }
  ///------------------------------------------------------
  onClickEdit() {
    this.enableEditing = true;
  }
  onClickCancel() {
    this.enableEditing = false;
    this.enableEdiDescription = false;

  }

  ///----------------------------------
}
