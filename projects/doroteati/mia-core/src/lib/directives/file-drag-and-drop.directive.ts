import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[miaFileDragAndDrop]',
  standalone: true,
})
export class FileDragAndDropDirective {

  @Output() fileSelected = new EventEmitter<File>();
  @Output() dragFileOver = new EventEmitter<boolean>();
  @Output() dragFileLeave = new EventEmitter<boolean>();

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  activate(e: DragEvent) {
    e.preventDefault();
    this.dragFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  deactivate(e: DragEvent) {
    e.preventDefault();
    this.dragFileLeave.emit(true);
  }

  @HostListener('drop', ['$event'])
  handleDrop(e: DragEvent) {
    this.deactivate(e);

    const fileList = e.dataTransfer?.files;
    if (!fileList) {
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (file) {
        this.fileSelected.emit(file);
      }
    }
    
  }
}
