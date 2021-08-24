import { NgModule } from '@angular/core';
import { MiaCoreComponent } from './mia-core.component';
import { MiaGoogleStorage, MIA_GOOGLE_STORAGE_PROVIDER } from './services/google-storage.service';
import { FileGoogleDirective } from './directives/file-google.directive';
import { MiaConfirmModalComponent } from './modals/mia-confirm-modal/mia-confirm-modal.component';

/** ANGULAR MATERIAL */
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FileDragAndDropDirective } from './directives/file-drag-and-drop.directive';


@NgModule({
  declarations: [
    MiaCoreComponent,
    FileGoogleDirective,
    MiaConfirmModalComponent,
    FileDragAndDropDirective
  ],
  imports: [
    CommonModule,

    /** MATERIAL */
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MiaCoreComponent,

    /** DIRECTIVES */
    FileGoogleDirective,
    FileDragAndDropDirective,
    
    MiaConfirmModalComponent
  ],
  providers: [
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useClass: MiaGoogleStorage
    }
  ]
})
export class MiaCoreModule { }
