import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService,
    private router: Router,
    public msg: MessageService,
    private clinicSer: ClinicsService
  ) {}

  ngOnInit(): void {
    this.getClinicPosts()
  }

  getClinicPosts() {
    this.loading.showLoading();
    this.clinicSer
      .getClinicPosts(this.page, this.pageCount)
      .subscribe((res) => {
        this.postsList = res.value;
        this.loading.hideLoading();
      });
  }

  //------------Post Modal-----------------------------
  setSelectedPost(post: any) {
    this.selectedPost = post;
    console.log(this.selectedPost);
    
  }

  showPostDetails(post: any) {
    this.clinicSer.getPostDetails(post.clinicId).subscribe(res =>{
      this.dialogSer
      .open(PostModalComponent, {
        data: {
          showPost: true,
          selectedPost: res.value,
        },
        autoZIndex: true,
        width: '500px',
        showHeader: false,
        closeOnEscape: true,
      });
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
          this.addNewPost();
        } else {
          this.editPost();
        }
      });
  }

  addNewPost() {}
  editPost() {}

  //---------------------------------
  deletePost() {
    this.loading.showLoading();
    this.clinicSer.deletePost(this.selectedPost.id).subscribe(res =>{
      this.getClinicPosts();
      this.msg.add({severity:'success', summary:'Delete Post', detail:'Deleted Successfully '});
    })
  }
}
