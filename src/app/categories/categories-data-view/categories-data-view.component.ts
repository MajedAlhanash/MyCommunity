import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { NewCategoryModal, EditCategoryModal } from 'src/app/model/categories/categories.modal';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ConfirmationDialog } from 'src/app/shared/component/confirmation-dialog/confirmation-dialog.component';
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
    private loading: LoadingService,
    private dialog: MatDialog
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
          this.editCategory(result);
        }
      })
  }

  private addNewCategory(newCategory:NewCategoryModal) { 
    this.loading.showLoading()
    this.categoriesService.addNewCategory(newCategory).subscribe(
      {
        next: data => {
          this.loading.hideLoading()
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('CATEGORIES'),
            detail: this.translate.instant('ADDED_SUCCESSFULL'),
          })
        },
        error: error => {
          this.loading.hideLoading()
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('CATEGORIES'),
            detail: this.translate.instant(error.message),
          })
          console.log(error.message);
        }
      
    })
  }
  private editCategory(editCategory:EditCategoryModal) {
    editCategory.Id = this.selectedCategory.id; 
    this.loading.showLoading()
    this.categoriesService.editNewCategory(editCategory).subscribe({
      next: data => {
        this.loading.hideLoading()
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('CATEGORIES'),
          detail: this.translate.instant('EDDITED_SUCCESSFULL'),
        })
      },
      error: error => {
        this.loading.hideLoading()
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('CATEGORIES'),
          detail: this.translate.instant(error.message),
        })
        console.log(error.message);
      }
    
  })
  }

  //selected Category
  setSelectedCategory(category: any) {
    this.selectedCategory = category
  }

  deleteCategory() {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
          message: 'Do you want to delete this category?'
      }
      });
       
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
              this.deleteCategoryInternal();
          }
      });
    

  }

  deleteCategoryInternal()
  {
    this.loading.showLoading()
    this.categoriesService.deleteCategory(this.selectedCategory).subscribe(
      {
        next: data => {
          this.loading.hideLoading()
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('CATEGORIES'),
            detail: this.translate.instant('DELETED_SUCCESSFULL'),
          })
          this.removeCategory();
        },
        error: error => {
          this.loading.hideLoading()
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('CATEGORIES'),
            detail: this.translate.instant(error.message),
          })
          console.log(error.message);
        }
      
    })
  }
  onChangePage(event:any){
    console.log(event);
  }

  // Go to the Category Details 
  goToCategoryDetails(category: any) {
    this.router.navigate(['/categories', category.id])
  }
  removeCategory()
  {
    let index: number = this.categories.indexOf(this.selectedCategory);
    if (index !== -1) 
    {
      this.categories.splice(index, 1);
    }
  }
}
