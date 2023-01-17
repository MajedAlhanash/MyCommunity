import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-category-data-view',
  templateUrl: './category-data-view.component.html',
  styleUrls: ['./category-data-view.component.scss']
})
export class CategoryDataViewComponent implements OnInit {

  public selectedCategory: any;

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

  public category = [
    {
      id: 1,
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      id:2,
      name: 'Pharmacy',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Human Medicine',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },

        {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
    {
      name: 'Dentist',
      imageUrl: 'assets/images/categories/teeth2.jpg',
    },
  ]

  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
  ) { }

  ngOnInit(): void {
  }

  openCategoryModal(status: string){
    this.dialogSer
      .open(CategoryModalComponent, {
        data: {
          subCategory: true,
          status: status,
          selectedCategory: this.selectedCategory
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


  setSelectedCategory(category:any){
    this.selectedCategory = category
  }

  deleteCategory(){
    let index = this.category.indexOf(this.selectedCategory);
    this.category.splice(index, 1);
  }
}
