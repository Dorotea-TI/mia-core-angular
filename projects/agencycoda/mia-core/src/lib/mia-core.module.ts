import { NgModule } from '@angular/core';
import { MiaCoreComponent } from './mia-core.component';
import { MiaGoogleStorage, MIA_GOOGLE_STORAGE_PROVIDER } from './services/google-storage.service';
import { FileGoogleDirective } from './directives/file-google.directive';



@NgModule({
  declarations: [
    MiaCoreComponent,
    FileGoogleDirective
  ],
  imports: [
  ],
  exports: [
    MiaCoreComponent,
    FileGoogleDirective
  ],
  providers: [
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useClass: MiaGoogleStorage
    }
  ]
})
export class MiaCoreModule { }
