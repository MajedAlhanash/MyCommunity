import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-archives-store-data-view',
  templateUrl: './archives-store-data-view.component.html',
  styleUrls: ['./archives-store-data-view.component.scss']
})
export class ArchivesStoreDataViewComponent implements OnInit {

  public clinicId!: number;
  public  stories= [];
  public selectedStory:any

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
      this.getClinicArchiveStories(this.clinicId);
    })
  }

  getClinicArchiveStories(clinicId:number){
      this.loading.showLoading()
      this.clinicServ.getClinicStroies(clinicId).subscribe(res =>{
        this.stories = res.value;
        this.loading.hideLoading()
      })
    
  }

  setSelectedArchiveStory(story:any){
    this.selectedStory = story
  }

  deleteArchiveStory(){}

  shareArchiveStory(){}
}
