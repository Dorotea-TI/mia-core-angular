import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MiaConfirmModalConfig } from '../../entities/mia-confirm-modal-config';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mia-mia-confirm-modal',
  templateUrl: './mia-confirm-modal.component.html',
  styleUrls: ['./mia-confirm-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class MiaConfirmModalComponent {
  readonly dialogRef = inject(MatDialogRef<MiaConfirmModalComponent>);
  readonly config = inject<MiaConfirmModalConfig>(MAT_DIALOG_DATA);

  onClick(value: unknown) {
    this.dialogRef.close(value);
  }
}
