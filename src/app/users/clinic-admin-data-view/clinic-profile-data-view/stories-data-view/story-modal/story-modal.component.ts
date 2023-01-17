import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html',
  styleUrls: ['./story-modal.component.scss']
})
export class StoryModalComponent implements OnInit {

  public storyForm!:FormGroup;
  //File uploader
  files: File[] = [];
  
  constructor(
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private loading: LoadingService,
    private _fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      text: []
    })
  }


  closeDialog() {
    this._dialogRef.close(null)
  }

  savePost(post: any) {
    this._dialogRef.close(post)
  }


  onSelect(event: any) {    
    this.files.push(...event.addedFiles);
    this.storyForm.get('icon')?.setValue(this.files[0])
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
