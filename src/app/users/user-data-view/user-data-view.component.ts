import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserResetPasswordModalComponent } from './user-reset-password-modal/user-reset-password-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/shared/component/confirmation-dialog/confirmation-dialog.component';
import { UsersService } from 'src/app/services/users/users.service';
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
      val: 0,
    },

    {
      val: 1,
      name: this.translate.instant('ACTIVE_USERS')
    },
    {
      val: 2,
      name: this.translate.instant('DEACTIVE_USERS')
    },
  ]

  users: any[] = []


  constructor(
    public translate: TranslateService,
    private dialogSer: DialogService,
    public loading: LoadingService,
    private dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.loading.showLoading();
    setTimeout(() => {
      this.loading.hideLoading()
    }, 100);
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(res => {
      this.users = res.dtos
      console.log(this.users)
    })
  }

  test(event: any) {
    console.log(event)
    this.usersService.searchUserByName(event).subscribe((res: any) => {
      this.users = res.dtos
    })
  }

  testSearch() {

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
          this.addNewUser(result)
        } else {
          this.editUser(result, this.selectedUser);
        }
      })
  }

  private addNewUser(user: any) {
    console.log(user)
    let formData = new FormData();
    formData.append('Image', user.image);
    formData.append('FirstName', user.name);
    formData.append('Email', user.email);
    formData.append('PhoneNumber', user.phone);
    formData.append('Password', user.password);
    formData.append('Gender', user.gender);
    formData.append('Type', '3');
    formData.append('IsActive', user.activeUser);
    formData.forEach(ele => {
      console.log(ele)
    })
    this.usersService.createUser(formData).subscribe(res => {
      console.log(res)
      this.getAllUsers();
    })
  }

  private editUser(user: any, selectedUser: any) {
    console.log(user)
    let formData = new FormData();
    formData.append('Image', user.image);
    formData.append('FirstName', user.name);
    formData.append('Email', user.email);
    formData.append('PhoneNumber', user.phone);
    formData.append('Password', user.password);
    formData.append('Gender', user.gender);
    formData.append('Type', '3');
    formData.append('Id', selectedUser.id);
    formData.append('IsActive', user.activeUser);
    if (user) {
      this.usersService.updateUser(formData).subscribe(res => {
        console.log(res)
        this.getAllUsers();
      })
    }
  }

  public setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  //------------------------------------------
  //------Reset password
  openResetPasswordModal(user: any) {
    console.log(user)
    this.dialogSer
      .open(UserResetPasswordModalComponent, {
        header: this.translate.instant('RESET_PASSWORD'),
        autoZIndex: true,
        width: '600px',
      })
      .onClose.subscribe((result) => {
        console.log(result)
        if (!result) {
          return
        }
        this.userResetPassword(user.id, result.new_password)
      })
  }

  private userResetPassword(userId: any, new_password: any) {
    return this.usersService.resetPassword(userId, new_password).subscribe(res => {
      console.log(res)
    })
  }


  deleteUser(user: any) {
    console.log(user)
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Do you want to delete this user?'
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.usersService.deleteUser(user.id).subscribe(
          result => console.log(result),
          error => {
            this.getAllUsers();
          }
        )
      }
    });
  }

  //--------------------------------------------

  filteredUser: any
  selectedValueChanged(event: any) {
    if (event === 1) {
      this.filteredUser = this.users.filter(item => {
        return item.isActive === true
      })
    }
    else {
      this.filteredUser = this.users.filter(item => {
        return item.isActive === false
      })
    }
    console.log(this.filteredUser)
  }

}
