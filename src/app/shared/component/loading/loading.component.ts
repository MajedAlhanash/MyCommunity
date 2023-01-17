import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit , AfterViewChecked {
  showLoadingSpinner = false;

  constructor(private loadingSvc: LoadingService , private cdRef : ChangeDetectorRef) {}

  ngOnInit() {
    this.loadingSvc.getLoadingShown().subscribe(loadingShown => {
      this.showLoadingSpinner = loadingShown;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
