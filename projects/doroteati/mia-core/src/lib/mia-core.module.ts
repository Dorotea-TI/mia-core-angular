import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MiaGoogleStorage,
  MIA_GOOGLE_STORAGE_PROVIDER,
} from './services/google-storage.service';
import { MiaCoreConfig, MIA_CORE_PROVIDER } from './entities/mia-core-config';
import { FileGoogleDirective } from './directives/file-google.directive';

import { MiaConfirmModalComponent } from './modals/mia-confirm-modal/mia-confirm-modal.component';
import { FileDragAndDropDirective } from './directives/file-drag-and-drop.directive';

/** ANGULAR MATERIAL */
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,

    /** MATERIAL */
    MatDialogModule,
    MatButtonModule,

    /** STANDALONE */
    FileGoogleDirective,
    FileDragAndDropDirective,
    MiaConfirmModalComponent,
  ],
  exports: [
    /** DIRECTIVES */
    FileGoogleDirective,
    FileDragAndDropDirective,

    MiaConfirmModalComponent,
  ],
  providers: [
    {
      provide: MIA_CORE_PROVIDER,
      useClass: MiaCoreConfig,
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useClass: MiaGoogleStorage,
    },
  ],
})
export class MiaCoreModule {}
