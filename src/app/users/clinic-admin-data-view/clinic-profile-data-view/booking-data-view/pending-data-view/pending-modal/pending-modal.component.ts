import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pending-modal',
  templateUrl: './pending-modal.component.html',
  styleUrls: ['./pending-modal.component.scss']
})
export class PendingModalComponent implements OnInit {

  public pendingForm!:FormGroup
  public dialogStatus!:string;
  public showBtn: boolean = false
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.pendingForm = this._fb.group({
      doctor_name:[],
      first_name:[],
      last_name:[],
      email:[],
      phone_number:[],
      date: [],
      note:[]
    })
  }

  ngOnInit(): void {
    if (this.config) {
      this.dialogStatus = this.config.data.status
      if (this.dialogStatus === 'Details') {
        this.showBtn = true;
      }
    }
  }

  saveReqest(request:any){}


  closeDialog() {
    this._dialogRef.close(null)
  }
}
