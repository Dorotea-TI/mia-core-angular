import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MiaFile } from '../entities/mia-file';
import { GoogleStorageService } from '../services/google-storage.service';

@Directive({
  selector: '[miaFileGoogle]',
  exportAs: 'miaFileGoogleDir'
})
export class FileGoogleDirective {

  @Output() fileUploaded = new EventEmitter<MiaFile>();
  @Output() startUpload = new EventEmitter<any>();
  @Output() endUpload = new EventEmitter<any>();

  numFilesUpload = 0;
  numFilesUploading = 0;

  constructor(
    //protected renderer: Renderer2, 
    //protected elmRef: ElementRef,
    protected googleStorage: GoogleStorageService) {
  }

  @HostListener('change', ["$event.target"])
  onChange(target: any) {
    // Verify if selected one file
    this.numFilesUpload = target.files.length;
    this.numFilesUploading = 0;
    if(target.files.length == 0){
      return;
    }
    // Call Start uploading
    this.startUpload.emit();
    // For each all files selected
    for (let i = 0; i < target.files.length; i++) {
      this.uploadFile(target.files[i]);
    }
  }

  uploadFile(file: File) {
    this.googleStorage.uploadDirect(file).subscribe(result => {
      if(!result.success){
        return;
      }
      this.fileUploaded.emit(result.response);

      this.numFilesUploading++;
      this.verifyIfEnd();
    });
  }

  verifyIfEnd() {
    if(this.numFilesUpload == this.numFilesUploading){
      this.endUpload.emit();
    }
  }

}
