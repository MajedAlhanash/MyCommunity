import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { PendingModalComponent } from './pending-modal/pending-modal.component';

@Component({
  selector: 'app-pending-data-view',
  templateUrl: './pending-data-view.component.html',
  styleUrls: ['./pending-data-view.component.scss']
})
export class PendingDataViewComponent implements OnInit {

  clinicId: any
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  values: any
  total: any


  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    private route: ActivatedRoute,
    private clinicSer: ClinicsService
  ) {
    this.route?.parent?.params.subscribe(res => {
      this.clinicId = res['id'];
    })
    let now = new Date();
    let before7Days = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    this.range.controls.start.setValue(before7Days);
    this.range.controls.end.setValue(now);
    console.log(this.range)
    this.filter()
    this.filter(this.range.value.start, this.range.value.end)
  }


  filter(start?: any, end?: any) {
    if (start && end)
      //this.values = this.dashboardServices.filter(this.range.value.start, this.range.value.end)
      return
    //this.total = this.dashboardServices.filter()
  }

  dateRangeChange() {
    if (this.range.value.start && this.range.value.end)
      //this.dashboardServices.filter(this.range.value.start, this.range.value.end)
    return
  }

  ngOnInit(): void {
    this.getClinicPendingAppointments(this.clinicId)
  }

  getClinicPendingAppointments(id: any) {
    this.clinicSer.getClinicPendingAppointments(id).subscribe(res => {
      console.log(res.value)
    })
  }
  addNewRequest(status: string, pending?: any) {
    this.dialogSer
      .open(PendingModalComponent, {
        data: {
          status: status,
          pending: pending
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


  requestDetails() { }


}
