import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { FileUploadModule } from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';
import {ScrollerModule} from 'primeng/scroller';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    SidebarModule,
    PanelMenuModule,
    CardModule,
    TagModule,
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    FileUploadModule,
    TabViewModule,
    ScrollerModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    TableModule,
    MultiSelectModule
  ],
  exports: [
    DataViewModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    SidebarModule,
    PanelMenuModule,
    CardModule,
    TagModule,
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    FileUploadModule,
    TabViewModule,
    ScrollerModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    TableModule,
    MultiSelectModule
  ],
  providers: [DialogService, MessageService],
})
export class PrimengModule { }
