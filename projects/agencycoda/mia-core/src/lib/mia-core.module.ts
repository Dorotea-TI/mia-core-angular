import { NgModule } from '@angular/core';
import { MiaCoreComponent } from './mia-core.component';
import { MiaGoogleStorage, MIA_GOOGLE_STORAGE_PROVIDER } from './services/google-storage.service';



@NgModule({
  declarations: [MiaCoreComponent],
  imports: [
  ],
  exports: [MiaCoreComponent],
  providers: [
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useClass: MiaGoogleStorage
    }
  ]
})
export class MiaCoreModule { }
