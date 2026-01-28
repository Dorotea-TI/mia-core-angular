import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
export class MiaConfirmModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MiaConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public config: MiaConfirmModalConfig
  ) {}

  ngOnInit(): void {}

  onClick(value: any) {
    this.dialogRef.close(value);
  }
}
