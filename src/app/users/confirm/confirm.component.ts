import { Component, Input,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent{

  @Input() messageText: string = "Are you sure you want to delete?"
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmComponent>) {
    if (data && data.message) {
      this.messageText = data.message
    }
  }
  confirm() {
    this.dialogRef.close(true)
  }
  cancel() {
    this.dialogRef.close()
  }

}
