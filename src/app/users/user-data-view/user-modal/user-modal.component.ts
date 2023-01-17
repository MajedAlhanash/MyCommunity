import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  public userForm!: FormGroup
  public dialogStatus!: string
  public selectedUser: any;
  public showUser!:boolean;

  profileImageSrc = 'assets/images/users/default.png'

  //File uploader
  files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      activeUser: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedUser = this.config.data.selectedUser
      this.showUser = this.config.data.showUser;
      if (this.dialogStatus === 'Edit') {
        this.userForm.get('name')?.setValue(this.selectedUser.name);
        this.userForm.get('email')?.setValue(this.selectedUser.email);
        this.userForm.get('gender')?.setValue(this.selectedUser.gender);
        this.userForm.get('password')?.setValue(this.selectedUser.password);
        this.userForm.get('phone')?.setValue(this.selectedUser.phone);
        this.userForm.get('gender')?.setValue(this.selectedUser.gender);
        this.userForm.get('activeUser')?.setValue(String(Number(this.selectedUser.active)));
        /*if(this.selectedUser.active)
        
          this.userForm.get('activeUser')?.setValue('1');
        else
          this.userForm.get('activeUser')?.setValue('0');*/

      }

      if(this.showUser){
        this.userForm.get('name')?.setValue(this.selectedUser.name);
        this.userForm.get('email')?.setValue(this.selectedUser.email);
        this.userForm.get('gender')?.setValue(this.selectedUser.gender);
        this.userForm.get('password')?.setValue(this.selectedUser.password);
        this.userForm.get('phone')?.setValue(this.selectedUser.phone);
        if(this.selectedUser.active)
          this.userForm.get('activeUser')?.setValue('Yes');
        else
          this.userForm.get('activeUser')?.setValue('No');
        this.userForm.disable()
      }
    }
  }

  saveUser(user: any) {
    this._dialogRef.close(user)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
