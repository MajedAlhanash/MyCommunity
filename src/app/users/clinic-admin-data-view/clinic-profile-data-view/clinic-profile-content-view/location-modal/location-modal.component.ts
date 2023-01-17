import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {

  public locationForm!:FormGroup;
  public dialogStatus!: string
  public selectedLocation: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.locationForm = this._fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedLocation = this.config.data.selectedLocation
      if (this.dialogStatus === 'Edit') {
        this.locationForm.get('name')?.setValue(this.selectedLocation.name);
      }
    }
  }

  saveLocation(location: any) {
    this._dialogRef.close(location)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }
}
