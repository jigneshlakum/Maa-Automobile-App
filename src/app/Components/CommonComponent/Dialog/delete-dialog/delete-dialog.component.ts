import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  @Input() addclass: boolean | undefined;
  @Output() toggleDeleteDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  emitCloseIconClick() {
    this.toggleDeleteDialog.emit();
  }

  emitDeleteClick() {
    this.delete.emit();
  }

}
