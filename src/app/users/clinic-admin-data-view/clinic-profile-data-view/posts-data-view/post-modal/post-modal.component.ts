import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  public dialogStatus!:string;
  public selectedPost: any;
  public showPost!:boolean;
  public postForm!:FormGroup;
  public categoryList : any
  public defultImg = 'assets/images/defultPost.jpeg';

  //File uploader
  files: File[] = [];
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private categoriesService: CategoriesService,
    private loading: LoadingService

  ) { 
    this.postForm = this._fb.group({
      text: []
    })
  }

  ngOnInit(): void {
    
    if (this.config) {
      this.dialogStatus = this.config.data.status
      this.selectedPost = this.config.data.selectedPost
      this.showPost = this.config.data.showPost
      //if (!this.showPost) {
      //  this.getAllCategories();
      //}
      if (this.dialogStatus === 'Edit') {
        this.postForm.get('text')?.setValue(this.selectedPost.text)
      }
    }
  }


  getAllCategories() {
    this.loading.showLoading()
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.categoryList = res.dtos
      this.loading.hideLoading()
    })
  }

  savePost(post: any) {
    this._dialogRef.close(post)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }



  onSelect(event: any) {    
    this.files.push(...event.addedFiles);
    this.postForm.get('icon')?.setValue(this.files[0])
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
