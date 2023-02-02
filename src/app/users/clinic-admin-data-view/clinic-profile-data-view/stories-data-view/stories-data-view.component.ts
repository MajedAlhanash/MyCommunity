import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { StoryModalComponent } from './story-modal/story-modal.component';

@Component({
  selector: 'app-stories-data-view',
  templateUrl: './stories-data-view.component.html',
  styleUrls: ['./stories-data-view.component.scss']
})
export class StoriesDataViewComponent implements OnInit {

  public clinicId!: number;
  public stories = [];
  public selectedStory: any

  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    private clinicServ: ClinicsService,
    private loading: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private msgSer: MessageService
  ) { }

  ngOnInit(): void {
    this.route?.parent?.params.subscribe(res => {
      this.clinicId = res['id'];
      this.getClinicStories(this.clinicId);
    })
  }


  getClinicStories(clinicId: number) {
    this.loading.showLoading()
    this.clinicServ.getClinicStroies(clinicId).subscribe(res => {
      this.stories = res.value;
      this.stories.sort((a: any, b: any) => a.creationTime - b.creationTime);
      console.log(this.stories)
      this.loading.hideLoading()
    })
  }

  //-----------------------------------------
  setSelectedStory(story: any) {
    this.selectedStory = story
  }

  addNewStory() {
    this.dialogSer
      .open(StoryModalComponent, {
        autoZIndex: true,
        width: '500px',
        showHeader: false
      })
      .onClose.subscribe((result) => {
        console.log(result)
        if (!result) {
          return
        }
        var formData = new FormData()
        formData.append('ClinicId', this.clinicId.toString());
        formData.append('Text', result.text);
        formData.append('Image', result.image)
        this.clinicServ.createStory(formData).subscribe(res => {
          this.getClinicStories(this.clinicId)
          this.loading.hideLoading();
        })
      })
  }


  deleteStory() {
    this.loading.showLoading();
    this.clinicServ.deleteStory(this.selectedStory.id).subscribe({
      next: (res) => {
        this.getClinicStories(this.clinicId)
        this.loading.hideLoading();
        this.msgSer.add({ severity: 'success', summary: 'Delete Story', detail: 'Deleted Successfully ' });
      },
      error: () => {
        this.loading.hideLoading();
        this.msgSer.add({ severity: 'error', summary: 'Delete Story', detail: 'Deleted Failed ' });
      }
    })
  }

  search(text: any) {
    console.log(text)
    this.stories = this.stories.filter((item: any) => {
      return (item.text as string).includes(text)
    })
  }
}
