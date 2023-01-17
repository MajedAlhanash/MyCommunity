import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from 'primeng/api';
import { MaterialModule } from '../shared/material.module';
import { PrimengModule } from '../shared/primeng.module';
import { CategoriesDataViewComponent } from './categories-data-view/categories-data-view.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CategoryDataViewComponent } from './category-data-view/category-data-view.component';


@NgModule({
  declarations: [
    CategoriesDataViewComponent,
    CategoryModalComponent,
    CategoryDataViewComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    MaterialModule,
    PrimengModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class CategoriesModule { }
