import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-category-data-view',
  templateUrl: './category-data-view.component.html',
  styleUrls: ['./category-data-view.component.scss']
})
export class CategoryDataViewComponent implements OnInit {

  public selectedClinic: any;
  sub!: Subscription;
  public category: any;

  public defultImg = 'assets/images/users/default.png';
  public sortValue = [
    {
      val: 1,
      name: this.translate.instant('ACTIVE_USERS')
    },
    {
      val: 2,
      name: this.translate.instant('DEACTIVE_USERS')
    },
  ];

  public clinics = [
    {
      id: 1,
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      id:2,
      name: 'Pharmacy',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    }
  ];

  constructor(
    private router: Router,
    public translate: TranslateService,
    private dialogSer: DialogService,
    private loading: LoadingService,
    private clinicsService: ClinicsService,
    private categoriesService: CategoriesService,
    ) { }

  ngOnInit(): void {
    this.getCategory();
    console.log('hi');
    //this.getClinics();
  }

  getCategory():void
  {
    let url = this.router.url;
    let id = url.split('/').pop();
    this.loading.showLoading();
    this.sub = this.categoriesService.getCategory(Number(id)).subscribe(res=>{
      this.category = res;
      this.clinics = res.clinicCategories;
      this.loading.hideLoading()
    })
  }

  openCategoryModal(status: string){
    this.dialogSer
      .open(CategoryModalComponent, {
        data: {
          subCategory: true,
          status: status,
          //selectedCategory: this.selectedCategory
        },
        header: status === 'Add' ? this.translate.instant('ADD_CATEGORY') : this.translate.instant('EDIT_CATEGORY'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        if (status === 'Add') {
          this.addNewCategory()
        } else {
          this.editCategory();
        }
      })
  }

  private addNewCategory(){}
  private editCategory(){}
  test(){}


  setSelectedClinic(clinic:any){
    this.selectedClinic = clinic
  }

  removeClinic(){
    this.loading.showLoading()
    this.categoriesService.unassignCategoryClinic(this.selectedClinic).subscribe(
      {
        next: data => {
          this.loading.hideLoading()
          this.removeClinicFromList();
        },
        error: error => {
          this.loading.hideLoading()
          console.error(error.message);
        }
      
    })


  }
  removeClinicFromList()
  {
    let index: number = this.clinics.indexOf(this.selectedClinic);
    if (index !== -1) 
    {
      this.clinics.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()    
  }

}
