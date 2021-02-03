import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DialogComponent } from '../components/dialog/dialog.component';

export class DialogRefService<T = any> {
  constructor(private dialogRef: MatDialogRef<DialogComponent<T>>) { }

  afterClosed() {
    return this.dialogRef.afterClosed().pipe(first());
  }

  afterOpened() {
    return this.dialogRef.afterOpened().pipe(first());
  }

  get matDialogRef() {
    return this.dialogRef;
  }
}
