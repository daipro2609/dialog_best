import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogCommonModel, DialogParam } from '../models';
import { DialogRefService } from './dialog-ref.service';

@Injectable()
export class DialogFactoryService<T = any> {
  dialogRefCommon: MatDialogRef<DialogComponent<T>>;
  dialogRefBasic: MatDialogRef<DialogComponent<T>>;
  constructor(private dialog: MatDialog) { }
  public createDialogCommon(dialogData: DialogParam<DialogCommonModel>): DialogRefService<DialogCommonModel> {
    const dialogRef = this.dialog.open<DialogComponent<DialogCommonModel>, DialogParam<DialogCommonModel>>(
      DialogComponent,
      {
        data: dialogData
      }
    );
    return new DialogRefService(dialogRef);
  }

  public createDialogBasic(dialogData: DialogParam<T>): DialogRefService<T> {
    const dialogRef = this.dialog.open<DialogComponent<T>, DialogParam<T>>(
      DialogComponent, { data: dialogData }
    );
    return new DialogRefService(dialogRef);
  }

  public closeAll(): void {
    this.dialog.closeAll();
  }

}
