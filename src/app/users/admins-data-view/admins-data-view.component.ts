import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
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

  admins = [
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
      role:"Admin"
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
      role:"Admin"

    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'female',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: '',
      active: false,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: '',
      active: false,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: '',
      active: false,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.ascasdas',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png'
    },
  ]
  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loading.showLoading();
    setTimeout(() => {
      this.loading.hideLoading()
    }, 100);
  }

  test() {
    alert('hi')
  }

  //Create new admin
  openAdminModal(status: string) {
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
          this.addNewAdmin()
        } else {
          this.editAdmin();
        }
      })
  }

  private addNewAdmin() { }

  private editAdmin() { }

  public setSelectedAdmin(user: any) {
    this.selectedAdmin = user;
  }

  deleteAdmin() {
    let index = this.admins.indexOf(this.selectedAdmin);
    this.admins.splice(index, 1);
  }

  //------------------------------------------
  //------Reset password
  openResetPasswordModal() {
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
        this.adminResetPassword()
      })
  }

  private adminResetPassword() { }
}

