import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesDataViewComponent } from './categories-data-view/categories-data-view.component';
import { CategoryDataViewComponent } from './category-data-view/category-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesDataViewComponent
  },
  {
    path: ':id',
    component: CategoryDataViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
