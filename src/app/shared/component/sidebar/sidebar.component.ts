import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebarItems!: MenuItem[];
  public visible: boolean = true;

  constructor(
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.sidebarItems = [
      {
        label: 'Users',
        icon: 'pi pi-pw pi-users',
        routerLink: ['/'],
        command: (click) => { this.router.navigate(['/']); }
      },
      {
        label: 'Clinics',
        icon: 'pi pi-pw pi-briefcase',
        routerLink: ['/clinic-admins'],
        command: (click) => { this.router.navigate(['/clinic-admins']); }
      },
      {
        label: 'Categories',
        icon: 'pi pi-pw pi-th-large',
        routerLink: ['/categories'],
        command: (click) => { this.router.navigate(['/categories']); }
      },
      {
        label: this.translate.instant('NOTIFICATIOS'),
        icon: 'pi pi-pw pi-bell',
        routerLink: ['/notifications'],
        command: (click) => { this.router.navigate(['/notifications']); }
      },
      {
        label: this.translate.instant('SUPER_ADMINS'),
        icon: 'pi pi-pw pi-shield',
        expanded: true,
        items: [
          {
            label: this.translate.instant('DASHBOARD_USERS'), icon: 'pi pi-users', routerLink: ['/admins'],
          },
          { label: this.translate.instant('ROLES'), icon: 'pi pi-cog ' ,routerLink: ['/roles'] },
        ],
      },
      {
        label: this.translate.instant('SETTINGS'),
        icon: 'pi pi-pw pi-bell',
        routerLink: ['/settings'],
        command: (click) => { this.router.navigate(['/settings']); }
      },
    ]
  }

}
