import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-insurance-modal',
  templateUrl: './insurance-modal.component.html',
  styleUrls: ['./insurance-modal.component.scss']
})
export class InsuranceModalComponent implements OnInit {

  public insuranceForm!:FormGroup;
  public dialogStatus!: string
  public selectedInsurance: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.insuranceForm = this._fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedInsurance = this.config.data.selectedInsurance
      if (this.dialogStatus === 'Edit') {
        this.insuranceForm.get('name')?.setValue(this.selectedInsurance.name);
      }
    }
  }

  saveInsurance(insurance: any) {
    this._dialogRef.close(insurance)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }
}
