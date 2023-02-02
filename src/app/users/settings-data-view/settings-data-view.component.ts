import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { SocialModalComponent } from './social-modal/social-modal.component';

@Component({
  selector: 'app-settings-data-view',
  templateUrl: './settings-data-view.component.html',
  styleUrls: ['./settings-data-view.component.scss']
})
export class SettingsDataViewComponent implements OnInit {

  public socialAccount = [];
  public defultImg = 'assets/images/defultPost.jpeg';
  public selectedAccount: any;

  constructor(
    private settingsSer: SettingsService,
    private loading: LoadingService,
    private dialogSer: DialogService,
    public translate: TranslateService,
    public msgSer: MessageService
  ) { }

  ngOnInit(): void {
    this.getSocialAccount()
  }

  getSocialAccount() {
    this.loading.showLoading();
    this.settingsSer.getSocailAccount().subscribe(res => {
      this.socialAccount = res.value;
      console.log(this.socialAccount)
      console.log(this.selectedAccount)
      this.loading.hideLoading()
    })
  }

  setSelectedAccount(account: any) {
    this.selectedAccount = account
  }

  openSocial(status: string) {
    this.dialogSer
      .open(SocialModalComponent, {
        data: {
          status: status,
          selectedAccount: this.selectedAccount
        },
        header:
          status === 'Add'
            ? this.translate.instant('ADD_SOCIAL_ACCOUNT')
            : this.translate.instant('EDIT_SOCIAL_ACCOUNT'),
        autoZIndex: true,
        width: '500px',
      })
      .onClose.subscribe((result) => {
        if (!result) {
          return;
        }
        if (status === 'Add') {
          this.addNewSocial(result);
        } else {
          this.editSocial(result, this.selectedAccount);
        }
      });
  }

  addNewSocial(account: any) {
    console.log(account)
    this.loading.showLoading()
    let formData = new FormData();
    formData.append('Icon', account.image);
    formData.append('AccountPlatform', account.accountPlatform);
    formData.append('AccountLink', account.accountLink);
    formData.append('Type', account.type);
    this.settingsSer.addNewSocialAccount(formData).subscribe({
      next: (res) => {
        console.log(res)
        this.getSocialAccount()
        this.msgSer.add({ severity: 'success', summary: 'Add Socail Account', detail: 'Added Successfully ' });
      },
      error: () => {
        this.loading.hideLoading()
      }
    })
  }

  editSocial(account: any, selectedAccount: any) {
    console.log(selectedAccount)
    this.loading.showLoading()
    let formData = new FormData();
    formData.append('Icon', account.image);
    formData.append('AccountPlatform', account.accountPlatform);
    formData.append('AccountLink', account.accountLink);
    formData.append('Type', account.type);
    formData.append('Id', selectedAccount.id);
    this.settingsSer.updateSocialAccount(formData).subscribe(res => {
      this.getSocialAccount()
      this.msgSer.add({ severity: 'success', summary: 'Edit Socail Account', detail: 'Edit Successfully ' });
    })
  }


  deleteSocial() {
    this.loading.showLoading();
    this.settingsSer.deleteSocialAccount(this.selectedAccount.id).subscribe({
      next: (res) => {
        console.log(res)
        this.getSocialAccount();
        this.msgSer.add({ severity: 'success', summary: 'Delete Socail Account', detail: 'Deleted Successfully ' });
      },
      error: () => {
        this.loading.hideLoading()
      }
    })
  }
}
