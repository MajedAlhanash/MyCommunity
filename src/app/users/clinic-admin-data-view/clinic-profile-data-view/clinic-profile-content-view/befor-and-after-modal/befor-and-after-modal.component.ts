import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-befor-and-after-modal',
  templateUrl: './befor-and-after-modal.component.html',
  styleUrls: ['./befor-and-after-modal.component.scss']
})
export class BeforAndAfterModalComponent implements OnInit {

  showDetails!:boolean;
  selectedData:any;
  dialogStatus!:string
  beforAndAfterForm!:FormGroup
    //File uploader
    files: File[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
  ) { 
    this.beforAndAfterForm = this._fb.group({
      text: [],
      image:[]
    })
  }

  ngOnInit(): void {
    if (this.config) {
      this.showDetails = this.config.data.showDetails;
      this.selectedData = this.config.data.selectedData
      this.dialogStatus = this.config.data.status;
      if (this.dialogStatus === 'Edit') {        
        this.beforAndAfterForm.get('text')?.setValue(this.selectedData.text)
      }
      
    }
  }


  saveBeforAndAter(beforAndAfterForm:any){
    this._dialogRef.close(beforAndAfterForm)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }

  onSelect(event: any) {    
    this.files.push(...event.addedFiles);
    this.beforAndAfterForm.get('image')?.setValue(this.files[0])
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
