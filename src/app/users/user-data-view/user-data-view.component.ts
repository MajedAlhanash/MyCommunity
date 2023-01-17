import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserResetPasswordModalComponent } from './user-reset-password-modal/user-reset-password-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/shared/component/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-user-data-view',
  templateUrl: './user-data-view.component.html',
  styleUrls: ['./user-data-view.component.scss']
})

export class UserDataViewComponent implements OnInit {

  innerWidth: any;
  @ViewChild('userModal') userModal: any;
  @ViewChild('resetPasswordModal') resetPasswordModal: any;
  selectedUser: any;
  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }

  public defultImg = 'assets/images/users/default.png';
  public sortValue = [
    {
      val: 1,
      name: this.translate.instant('ACTIVE_USERS')
    },
    {
      val: 2,
      name: this.translate.instant('DEACTIVE_USERS')
    },
  ]



  users = [
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
      password:"abcd"
    },
    {
      name: 'Name Name',
      phone: '+971 456 879',
      email: 'main@kasd.asc',
      gender: 'male',
      imageUrl: 'assets/images/users/img.png',
      active: true,
      password:"abcd"
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
    public loading: LoadingService,
    private dialog: MatDialog
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

  showUser(user: any) {
    this.dialogSer.open(
      UserModalComponent, {
      data: {
        selectedUser: user,
        showUser: true,
      },
      header: this.translate.instant('USER_INFO'),
      autoZIndex: true,
      width: '600px',
    });
  }

  //Create new user
  openUserModal(status: string) {
    this.dialogSer
      .open(UserModalComponent, {
        data: {
          status: status,
          selectedUser: this.selectedUser
        },
        header: status === 'Add' ? this.translate.instant('ADD_USER') : this.translate.instant('EDIT_USER'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        if (status === 'Add') {
          this.addNewUser()
        } else {
          this.editUser();
        }
      })
  }

  private addNewUser() { }

  private editUser() { }


  public setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  //------------------------------------------
  //------Reset password
  openResetPasswordModal() {
    this.dialogSer
      .open(UserResetPasswordModalComponent, {
        header: this.translate.instant('RESET_PASSWORD'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return
        }
        this.userResetPassword()
      })
  }

  private userResetPassword() { }


  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
    data:{
        message: 'Do you want to delete this user?'
    }
    });
     
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
            this.deleteUserInternal();
        }
    });
} 

  //--------------------------------------------
  deleteUserInternal() {
    let index = this.users.indexOf(this.selectedUser);
    this.users.splice(index, 1);
  }
}
