import { NgModule } from '@angular/core';
import { MiaCoreComponent } from './mia-core.component';
import { MiaGoogleStorage, MIA_GOOGLE_STORAGE_PROVIDER } from './services/google-storage.service';
import { FileGoogleDirective } from './directives/file-google.directive';
import { MiaConfirmModalComponent } from './modals/mia-confirm-modal/mia-confirm-modal.component';

/** ANGULAR MATERIAL */
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MiaCoreComponent,
    FileGoogleDirective,
    MiaConfirmModalComponent
  ],
  imports: [

    /** MATERIAL */
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MiaCoreComponent,
    FileGoogleDirective,
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
