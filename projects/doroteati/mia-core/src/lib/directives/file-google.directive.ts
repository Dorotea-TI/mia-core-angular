import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MiaFile } from '../entities/mia-file';
import { GoogleStorageService } from '../services/google-storage.service';

import imageCompression from 'browser-image-compression';

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
  async onChange(target: any) {
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
      await this.uploadFile(target.files[i]);
    }
  }

  async uploadFile(file: File) {
    const compressedFile = await this.compressFile(file);
    this.googleStorage.uploadDirect(compressedFile).subscribe(result => {
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

  private async compressFile(file: File) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      try {
        return await imageCompression(file, options);
      } catch (error) {
        console.log(`NO SE PUDO COMPRIMIR EL ARCHIVO --------- ${error}`);
        return file;
      }
  }

}
