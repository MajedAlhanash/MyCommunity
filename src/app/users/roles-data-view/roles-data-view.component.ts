import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RoleModalComponent } from './role-modal/role-modal.component';

@Component({
  selector: 'app-roles-data-view',
  templateUrl: './roles-data-view.component.html',
  styleUrls: ['./roles-data-view.component.scss'],
})
export class RolesDataViewComponent implements OnInit {
  public roles = [
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
    { name: 'Admin', role: 'Admin' },
  ];
  public selectedRole: any;
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading.showLoading();
    setTimeout(() => {
      this.loading.hideLoading()
    }, 100);
  }

  openRoleModal(status: string, selectedRole?: any) {
    this.dialogSer
      .open(RoleModalComponent, {
        data: {
          status: status,
          selectedRole: selectedRole,
        },
        header:
          status === 'Add'
            ? this.translate.instant('ADD_ROLE')
            : this.translate.instant('EDIT_ROLE'),
        autoZIndex: true,
        width: '500px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewRole();
        } else {
          this.editRole();
        }
      });
  }

  private addNewRole() {}
  private editRole() {}

  deleteRole() {}
}
