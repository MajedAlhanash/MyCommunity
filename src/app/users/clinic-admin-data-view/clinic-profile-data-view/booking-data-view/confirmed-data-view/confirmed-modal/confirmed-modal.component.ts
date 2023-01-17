import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmed-modal',
  templateUrl: './confirmed-modal.component.html',
  styleUrls: ['./confirmed-modal.component.scss']
})
export class ConfirmedModalComponent implements OnInit {

  public confirmedForm!:FormGroup
  public dialogStatus!:string;
  public showBtn: boolean = false
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.confirmedForm = this._fb.group({
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