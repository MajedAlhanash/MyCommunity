import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-clinic-modal',
  templateUrl: './clinic-modal.component.html',
  styleUrls: ['./clinic-modal.component.scss'],
})
export class ClinicModalComponent implements OnInit {
  public clinicForm!: FormGroup;
  public dialogStatus!: string;
  public selectedClinic: any;
  public categories: any;

  profileImageSrc = 'assets/images/users/default.png';
  //File uploader
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private categorySer: CategoriesService
  ) {
    this.clinicForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      clinic_style: [],
      category: []
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.getAllCategories();
      this.dialogStatus = this.config.data.status;
      this.selectedClinic = this.config.data.selectedClinic;
      if (this.dialogStatus === 'Edit') {
        this.clinicForm.get('name')?.setValue(this.selectedClinic.name);
        this.clinicForm.get('email')?.setValue(this.selectedClinic.email);
      }
    }
  }


  getAllCategories(){
    this.categorySer.getAllCategories().subscribe(res=>{
      this.categories = res.value
    })
  }

  saveAdmin(clinic: any) {
    this._dialogRef.close(clinic);
  }

  closeDialog() {
    this._dialogRef.close(null);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
