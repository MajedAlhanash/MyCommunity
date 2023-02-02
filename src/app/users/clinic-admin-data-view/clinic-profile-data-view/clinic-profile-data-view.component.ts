import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ClinicsService } from 'src/app/services/clinics/clinics.service';

@Component({
  selector: 'app-clinic-profile-data-view',
  templateUrl: './clinic-profile-data-view.component.html',
  styleUrls: ['./clinic-profile-data-view.component.scss']
})
export class ClinicProfileDataViewComponent implements OnInit {

  public defultImg = 'assets/images/users/img.png';

  public items!: MenuItem[];
  public id!: number;
  public selectedClinic: any;

  constructor(
    public translate: TranslateService,
    public router: Router,
    private route: ActivatedRoute,
    private clinicsService: ClinicsService,
  ) { }

  ngOnInit(): void {
    this.route?.params.subscribe(res => {
      this.id = res['id'];
      this.getCLinicDetails(this.id);
    })

    this.items = [
      {
        label: this.translate.instant('CLINIC_PROFILE'),
        routerLink: ['/clinic-admin', this.id],
        command: (click) => { this.router.navigate(['clinic-admin', this.id]); }
      },
      {
        label: this.translate.instant('POSTS'),
        routerLink: ['/clinic-admin', this.id, 'posts'],
        command: (click) => { this.router.navigate(['clinic-admin', this.id, 'posts']); }
      },
      {
        label: this.translate.instant('STORIES'),
        routerLink: ['/clinic-admin', this.id, 'stories'],
        command: (click) => { this.router.navigate(['clinic-admin', this.id, 'stories']); }
      },
      {
        label: this.translate.instant('BOOKINGS'),
        routerLink: ['/clinic-admin', this.id, 'pending'],
        command: (click) => { this.router.navigate(['clinic-admin', this.id, 'pending']); }
      },

    ]
  }

  getCLinicDetails(id: number) {
    this.clinicsService.getClinicDetailsById(id).subscribe(res => {
      this.selectedClinic = res.value
    })
  }
}
