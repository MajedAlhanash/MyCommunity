import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { AdminResetPasswordModalComponent } from './admin-reset-password-modal/admin-reset-password-modal.component';

@Component({
  selector: 'app-admins-data-view',
  templateUrl: './admins-data-view.component.html',
  styleUrls: ['./admins-data-view.component.scss']
})
export class AdminsDataViewComponent implements OnInit {

  public selectedAdmin: any;
  public defultImg = 'assets/images/users/default.png';

  admins: any[] = []
  roleList: any[] = []
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService,
    private userSer: UsersService,
    private roleSer: RoleService
  ) { }

  ngOnInit(): void {
    this.loading.showLoading();
    setTimeout(() => {
      this.loading.hideLoading()
    }, 100);
    this.getAllSuperAdmins();
  }

  getAllSuperAdmins() {
    this.userSer.getAllSuperAdmins().subscribe(res => {
      console.log(res.dtos)
      this.admins = res.dtos;

    })
  }


  test(text:any) {
    this.userSer.searchAdminByName(text).subscribe((res:any) =>{
      this.admins = res.dtos;
    })
  }

  //Create new admin
  openAdminModal(status: string) {
    setTimeout(() => {
      this.dialogSer
        .open(AdminModalComponent, {
          data: {
            status: status,
            selectedAdmin: this.selectedAdmin
          },
          header: status === 'Add' ? this.translate.instant('ADD_ADMIN') : this.translate.instant('EDIT_ADMIN'),
          autoZIndex: true,
          width: '700px',
        })
        .onClose.subscribe((result) => {
          if (!result) {
            return
          }
          if (status === 'Add') {
            this.addNewAdmin(result)
          } else {
            this.editAdmin(result);
          }
        })
    }, 1000)

  }

  private addNewAdmin(result: any) {
    let formData = new FormData();
    formData.append('FirstName', result.firstName);
    formData.append('LastName', result.lastName);
    formData.append('Image', result.image);
    formData.append('Email', result.email);
    formData.append('Password', result.password);
    formData.append('PhoneNumber', result.phoneNumber);
    formData.append('Type', '1');
    formData.append('Roles', result.role);
    formData.append('IsActive', result.isActive);

    this.userSer.createUser(formData).subscribe(res => {
      console.log(res)
      this.getAllSuperAdmins();
    })
  }

  private editAdmin(result: any) {
    console.log(result)
    let formData = new FormData();
    formData.append('FirstName', result.firstName);
    formData.append('LastName', result.lastName);
    formData.append('Image', result.image);
    formData.append('Email', result.email);
    formData.append('Password', result.password);
    formData.append('PhoneNumber', result.phoneNumber);
    formData.append('Type', '1');
    formData.append('Roles', result.role);
    formData.append('IsActive', result.isActive);
    formData.append('Id', this.selectedAdmin.id)

    this.userSer.updateUser(formData).subscribe(res => {
      console.log(res)
      this.getAllSuperAdmins();
    })
  }

  public setSelectedAdmin(user: any) {
    this.selectedAdmin = user;
  }

  deleteAdmin(admin: any) {
    this.userSer.deleteUser(admin.id).subscribe(
      res => {
        console.log(res)
      },
      error => {
        this.getAllSuperAdmins();
      })
  }

  //------------------------------------------
  //------Reset password
  openResetPasswordModal(admin: any) {
    this.dialogSer
      .open(AdminResetPasswordModalComponent, {
        header: this.translate.instant('RESET_PASSWORD'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        this.adminResetPassword(result, admin)
      })
  }

  private adminResetPassword(result: any, admin: any) {
    this.userSer.resetPassword(admin.id, result.new_password).subscribe(res => {
      console.log(res)
    })
  }
}

