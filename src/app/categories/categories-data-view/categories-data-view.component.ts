import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { NewCategoryModal } from 'src/app/model/categories/categories.modal';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-categories-data-view',
  templateUrl: './categories-data-view.component.html',
  styleUrls: ['./categories-data-view.component.scss']
})
export class CategoriesDataViewComponent implements OnInit, OnDestroy {

  public selectedCategory: any;

  public defultImg = 'assets/images/users/default.png';
  public categories: any;
  sub!: Subscription;



  constructor(
    public translate: TranslateService,
    private categoriesService: CategoriesService,
    private dialogSer: DialogService,
    private router: Router,
    private messageService: MessageService,
    private loading: LoadingService
  ) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe()    
  }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(search?: string) {
    this.loading.showLoading()
    this.sub = this.categoriesService.getAllCategories(search).subscribe((res) => {
      this.categories = res.dtos
      this.loading.hideLoading()
    })
  }


  search(searchValue:string) {
      this.getCategories(searchValue);     
   }

  openCategoryModal(status: string) {
    this.dialogSer
      .open(CategoryModalComponent, {
        data: {
          status: status,
          selectedCategory: this.selectedCategory,
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
          this.addNewCategory(result)
        } else {
          this.editCategory();
        }
      })
  }

  private addNewCategory(newCategory:NewCategoryModal) { 
    this.loading.showLoading()
    this.categoriesService.addNewCategory(newCategory).subscribe(res =>{
      console.log(res);
      this.loading.hideLoading()
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('CATEGORIES'),
        detail: this.translate.instant('ADDED_SUCCESSFULL'),
      })
    })
  }
  private editCategory() { }

  //selected Category
  setSelectedCategory(category: any) {
    this.selectedCategory = category
  }

  deleteCategory() {
    // let index = this.categories.indexOf(this.selectedCategory);
    // this.categories.splice(index, 1);
  }

  onChangePage(event:any){
    console.log(event);
  }

  // Go to the Category Details 
  goToCategoryDetails(category: any) {
    this.router.navigate(['/categories', category.id])
  }
}
