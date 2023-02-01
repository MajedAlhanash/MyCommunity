import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  public dialogStatus!: string;
  public selectedPost: any;
  public showPost!: boolean;
  public postForm!: FormGroup;
  public categoryList: any
  public defultImg = 'assets/images/defultPost.jpeg';

  //File uploader
  files: File[] = [];
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private categoriesService: CategoriesService,
    private loading: LoadingService,
    private clinicService:ClinicsService

  ) {
    this.postForm = this._fb.group({
      text: [],
      image: []
    })
  }

  ngOnInit(): void {

    if (this.config) {
      this.dialogStatus = this.config.data.status
      this.selectedPost = this.config.data.selectedPost
      this.showPost = this.config.data.showPost
      console.log(this.config.data.selectedPost.creationTime)
      //if (!this.showPost) {
      //  this.getAllCategories();
      //}
      if (this.dialogStatus === 'Edit' || this.showPost === true) {
        this.clinicService.getPostDetails(this.selectedPost.id).subscribe(res =>{
          console.log(res)
          this.selectedPost = res.value
          this.postForm.get('text')?.setValue(this.selectedPost.text)
          this.imageBase64 = this.selectedPost.imagePath
        })
        
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
    console.log(post)
    this._dialogRef.close(post)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBase64: any
  file: any
  onFileChange(event: any) {
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        // convert image to base64 format
        this.imageBase64 = reader.result as string;
      };
    }
  }

  dataURLtoFile(dataurl: any, filename: any) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  finalFile: any;
  imageCropped(event: ImageCroppedEvent) {
    this.imageBase64 = event.base64;
    let file = this.dataURLtoFile(this.imageBase64, 'photo.png');
    this.postForm.get('image')?.setValue(file);
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  cropperClosed = false;
  closeCropper(event: any) {
    event.preventDefault();
    this.cropperClosed = true;
  }

  resetCropper(event: any) {
    event.preventDefault();
    console.log(this.file[0])
    this.postForm.get('image')?.setValue(this.file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
      // convert image to base64 format
      this.imageBase64 = reader.result as string;
      this.cropperClosed = true;
    };
  }

}
