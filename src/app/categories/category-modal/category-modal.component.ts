import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  public categoryForm!: FormGroup;
  public dialogStatus!: string;
  public selectedCategory: any;
  public clinicList:any
  public clinicSearchList:any
  //File uploader
  files: File[] = [];
  profileImageSrc = 'assets/images/users/default.png';
  sub!: Subscription;


  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    public clinicService: ClinicsService,
    private loading: LoadingService

  ) {
    this.categoryForm = this._fb.group({
      Name: ['', Validators.required],
      icon: [''],
      clinics: [],
      desc: []
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.getAllCLinics()
      this.dialogStatus = this.config.data.status;
      this.selectedCategory = this.config.data.selectedCategory;
      if (this.dialogStatus === 'Edit') {
        this.files.push(this.selectedCategory.iconPath)
        this.categoryForm.get('icon')?.setValue(this.selectedCategory.iconPath)
        this.categoryForm.get('name')?.setValue(this.selectedCategory.name);
      }
    }
  }

  getAllCLinics(){
    this.loading.showLoading()
    this.sub = this.clinicService.getAllCLinics().subscribe(res=>{
        this.clinicList = res.value;
        this.clinicSearchList = res.value;
        this.loading.hideLoading()
    })
  }
  saveCategory(category: any) {
    this._dialogRef.close(category);
  }

  closeDialog() {
    this._dialogRef.close(null);
  }

  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    console.log(this.files);

    this.categoryForm.get('icon')?.setValue(this.files[0])
    console.log(this.categoryForm.value);

    // const formData = new FormData();

    // for (var i = 0; i < this.files.length; i++) {
    //   formData.append('file[]', this.files[i]);
    // }
  }

  onRemove(event: any) {
    this.files = [];
  }



  //------on Search Clinic------------------
  onClinicKey(value: any) {
    this.clinicSearchList = [];
    this.selectClinicSearch(value.value);
  }

  selectClinicSearch(value: string) {
    let filter = value.toLowerCase();    
    for (let i = 0; i < this.clinicList.length; i++) {
      let option = this.clinicList[i];
      if (option.name) {        
        if (option.name.indexOf(filter) >= 0) {
          this.clinicSearchList.push(option);
        }
      }
    }
  }
  
}
