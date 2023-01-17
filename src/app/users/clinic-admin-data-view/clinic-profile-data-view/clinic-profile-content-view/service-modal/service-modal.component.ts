import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {
  public serviceForm!: FormGroup;
  public dialogStatus!: string
  public selectedService: any;
  public clinicId!: number;
  //File uploader
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.serviceForm = this._fb.group({
      clinicId: [],
      icon: [],
      name: ['', Validators.required],
      webSiteUrl: ['']
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.clinicId = +this.config.data.clinicId;
      this.serviceForm.get('clinicId')?.setValue(this.clinicId)      
      this.selectedService = this.config.data.selectedService
      if (this.dialogStatus === 'Edit') {
        this.serviceForm.get('clinicId')?.setValue(this.selectedService.clinicId)
        this.serviceForm.get('name')?.setValue(this.selectedService.name);
        this.serviceForm.get('webSiteUrl')?.setValue(this.selectedService.webSiteUrl);
        this.serviceForm.get('icon')?.setValue(this.selectedService.icon)
      }
    }
  }

  saveService(location: any) {
    this._dialogRef.close(location)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }


  onSelect(event: any) {    
    this.files.push(...event.addedFiles);
    this.serviceForm.get('icon')?.setValue(this.files[0])
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
