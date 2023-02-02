import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-display-custom-users',
  templateUrl: './display-custom-users.component.html',
  styleUrls: ['./display-custom-users.component.scss']
})
export class DisplayCustomUsersComponent implements OnInit {

  usersList:any[]=[]
  constructor(
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { }


  ngOnInit(): void {
    if (this.config.data) {
      
      this.usersList = this.config.data.list
      console.log(this.usersList)
    }
  }

}
