import { Directive, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { MiaFile } from '../entities/mia-file';
import { GoogleStorageService } from '../services/google-storage.service';

@Directive({
  selector: '[miaFileGoogle]',
  exportAs: 'miaFileGoogleDir',
  standalone: true,
})
export class FileGoogleDirective {
  @Output() fileUploaded = new EventEmitter<MiaFile>();
  @Output() startUpload = new EventEmitter<void>();
  @Output() endUpload = new EventEmitter<void>();

  numFilesUpload = 0;
  numFilesUploading = 0;

  private readonly googleStorage = inject(GoogleStorageService);

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.files) {
      return;
    }
    // Verify if selected one file
    const files = target.files;
    this.numFilesUpload = files.length;
    this.numFilesUploading = 0;
    if (files.length === 0) {
      return;
    }
    // Call Start uploading
    this.startUpload.emit();
    // For each all files selected
    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  }

  uploadFile(file: File) {
    this.googleStorage.uploadDirect(file).subscribe((result) => {
      if (!result.success) {
        return;
      }
      this.fileUploaded.emit(result.response);

      this.numFilesUploading++;
      this.verifyIfEnd();
    });
  }

  verifyIfEnd() {
    if (this.numFilesUpload === this.numFilesUploading) {
      this.endUpload.emit();
    }
  }
}
