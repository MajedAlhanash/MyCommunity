import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RoleService } from 'src/app/services/role.service';
import { RoleModalComponent } from './role-modal/role-modal.component';

@Component({
  selector: 'app-roles-data-view',
  templateUrl: './roles-data-view.component.html',
  styleUrls: ['./roles-data-view.component.scss'],
})
export class RolesDataViewComponent implements OnInit {

  allPermissions: any[] = []
  roles: any[] = []
  public selectedRole: any;
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService,
    private roleSer: RoleService
  ) { }

  ngOnInit(): void {
    this.loading.showLoading();
    this.getAllRoles();
    this.getAllPermissions();

  }

  getAllPermissions() {
    this.roleSer.getAllPermissions().subscribe(res => {
      console.log(res.dtos)
      this.allPermissions = res.dtos
      this.loading.hideLoading()
    })
  }

  getAllRoles() {
    this.roleSer.getAllRoles().subscribe(res => {
      this.roles = res.dtos
      console.log(this.roles)
      this.loading.hideLoading()
    })
  }

  rolesWithPermissions: any[] = []
  getPermissoinsForRole() {
    return this.roles.forEach(element => {
      this.roleSer.getRolePermissions(element.id).subscribe(res => {
        this.rolesWithPermissions.push(res)
        console.log(this.rolesWithPermissions)
      })
    })
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
          this.addNewRole(result);
        } else {
          this.editRole(result, selectedRole);
        }
      });
  }

  private addNewRole(result: any) {
    let modal = {
      permissionsIds: result.permissions,
      name: result.name
    }
    this.roleSer.addNewRole(modal).subscribe(res => {
      this.getAllRoles();
    })
  }

  private editRole(result: any, selectedRole: any) {
    let modal = {
      permissionsIds: result.permissions,
      roleId: selectedRole.id
    }
    this.roleSer.assignPermissionsToRole(modal).subscribe(res => {
      console.log(res)
    })
  }

  deleteRole(role: any) {
    console.log(role)
    this.roleSer.deleteRole(role.id).subscribe(res => {
      console.log(res)
    })
  }

  searchRoleByName(text: any) {
    this.roleSer.searchRoleByName(text).subscribe(res => {
      this.roles = res.dtos
    })
  }
}
