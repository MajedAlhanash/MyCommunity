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

@Component({
  selector: 'app-clinic-profile-content-view',
  templateUrl: './clinic-profile-content-view.component.html',
  styleUrls: ['./clinic-profile-content-view.component.scss'],
})
export class ClinicProfileContentViewComponent implements OnInit, OnChanges {
  public tapIndex: number = 0;
  public clinicId!: number;
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
    public route: ActivatedRoute,
    private loading: LoadingService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.route?.params.subscribe((res) => {
      this.clinicId = res['id'];
      this.loading.showLoading();
      this.getCLinicDetails(this.clinicId);
      this.getClinicLocations(this.clinicId);
      this.getClinicServices(this.clinicId);
      this.getClinicInsurances(this.clinicId);
      this.getClinicBeforAndAfter(this.clinicId, 1, 100);
    });
  }
  onChangeTap(e: any) {
    console.log(e);
  }

  getCLinicDetails(id: number) {
    this.clinicsService.getClinicDetailsById(id).subscribe((res) => {
      this.selectedClinic = res.value;
      this.doctorsList = this.selectedClinic?.doctors;
    });
  }

  onClickEditDescription(){
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
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewBeforAndAfter();
        } else {
          this.editBeforAndAfter();
        }
      });
  }

  private addNewBeforAndAfter() {}
  private editBeforAndAfter() {}

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
  //---------------------Location Modal----------------------------------
  getClinicLocations(clinicId: number) {
    this.clinicsService.getClinicLocation(clinicId).subscribe((res) => {
      this.locationList = res.value;
      this.loading.hideLoading();
    });
  }

  setSelectedLocation(location: any) {
    this.selectedLocation = location;
  }

  openLocationModal(status: string) {
    this.dialogSer
      .open(LocationModalComponent, {
        data: {
          status: status,
          selectedLocation: this.selectedLocation,
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
        if (status === 'Add') {
          this.addNewLocation();
        } else {
          this.editLocation();
        }
      });
  }

  private addNewLocation() {}
  private editLocation() {}

  deleteLocation() {}

  //---------------------Service Modal----------------------------------
  getClinicServices(clinicId: number) {
    this.clinicsService.getClinicServices(clinicId).subscribe((res) => {
      this.servicesList = res.value;
      this.loading.hideLoading();
    });
  }

  setSelectedService(service: any) {
    this.selectedService = service;
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
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewService(result);
        } else {
          this.editService();
        }
      });
  }

  private addNewService(newService: any) {
    var formData: any = new FormData();
    formData.append('name', newService?.name);
    formData.append('clinicId', newService?.clinicId);
    formData.append('icon', newService?.icon);
    formData.append('webSiteUrl', newService?.webSiteUrl);
    console.log(formData);
    this.clinicsService.createService(newService).subscribe((res) => {
      console.log(res);
    });
  }
  private editService() {}
  public deleteService() {}

  //---------------------Insurance Modal----------------------------------
  getClinicInsurances(clinicId: number) {
    this.clinicsService.getClinicInsurances(clinicId).subscribe((res) => {
      this.InsuranceList = res.value;
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
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewInsurance();
        } else {
          this.editInsurance();
        }
      });
  }

  private addNewInsurance() {}
  private editInsurance() {}
  public deleteInsurance() {}

  /////----------------Doctor Modal-----------------------
  public onEditDoctor() {
    this.dialogSer
      .open(DoctorDataViewComponent, {
        data: {
          doctorsList: this.doctorsList,
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

  public showDoctorDetails(doctor: any) {
    this.dialogSer
      .open(DoctorModalComponent, {
        data: {
          selectedDoctor: doctor,
          showDetails: true,
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
