import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { PostModalComponent } from './post-modal/post-modal.component';

@Component({
  selector: 'app-posts-data-view',
  templateUrl: './posts-data-view.component.html',
  styleUrls: ['./posts-data-view.component.scss'],
})
export class PostsDataViewComponent implements OnInit {
  public defultImg = 'assets/images/defultPost.jpeg';
  public selectedPost: any;
  public postsList = [];
  public page: number = 1;
  public pageCount: number = 1000;
  clinicId: any
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public msg: MessageService,
    private clinicSer: ClinicsService
  ) {
    var numb = this.router.url.match(/\d/g);
    this.clinicId = numb?.join('')
  }

  ngOnInit(): void {
    this.getClinicPosts()

  }

  getClinicPosts() {
    this.loading.showLoading();
    this.clinicSer
      .getClinicPosts(this.clinicId)
      .subscribe((res) => {
        this.postsList = res.value;
        console.log(this.postsList)
        this.loading.hideLoading();

      });
  }

  //------------Post Modal-----------------------------
  setSelectedPost(post: any) {
    this.selectedPost = post;
    console.log(this.selectedPost);

  }

  showPostDetails(post: any) {
    this.dialogSer
      .open(PostModalComponent, {
        data: {
          showPost: true,
          selectedPost: post,
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      });
  }

  openPostModal(status: string) {
    this.dialogSer
      .open(PostModalComponent, {
        data: {
          status: status,
          selectedPost: this.selectedPost,
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewPost(result);
        } else {
          this.editPost(result, this.selectedPost);
        }
      });
  }

  addNewPost(result: any) {
    var formData = new FormData()
    formData.append('Text', result.text);
    formData.append('Image', result.image);
    formData.append('ClinicId', this.clinicId)
    this.clinicSer.createClinicPost(formData).subscribe(res => {
      console.log(res)
      this.getClinicPosts()
    })
  }
  editPost(result: any, selectedPost: any) {
    var formData = new FormData()
    formData.append('Text', result.text);
    formData.append('Image', result.image);
    formData.append('Id', selectedPost.id)
    this.clinicSer.updataClinicPost(formData).subscribe(res => {
      console.log(res)
      this.getClinicPosts()
    })
  }

  //---------------------------------
  deletePost() {
    this.loading.showLoading();
    this.clinicSer.deletePost(this.selectedPost.id).subscribe(res => {
      this.getClinicPosts();
      this.msg.add({ severity: 'success', summary: 'Delete Post', detail: 'Deleted Successfully ' });
    })
  }

  search(text: any) {
    console.log(text)
    this.clinicSer.searchPost(text).subscribe(res => {
      console.log(res)
      this.postsList = res.value
    })
  }
}
