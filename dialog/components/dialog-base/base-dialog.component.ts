import { Injectable, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogResultEnum, FlgEnum } from '@core/enum';
import { DialogParam, DialogResult, DialogGroupButton } from '@core/dialog/models';

@Injectable()
export abstract class BaseDialogComponent {
  public abstract ngOnSubmitDialog(event: DialogResultEnum): void;
  constructor(@Inject(MAT_DIALOG_DATA) public param: DialogParam<any>) {
    this.param?.$event.subscribe(result => {
      if (result && result.IsParent === FlgEnum.TRUE) {
        this.ngOnSubmitDialog(result.DialogResult);
      }
    });
  }

  protected setTitleDialog(title: string): void {
    this.param.Title = title;
  }

  protected setStatusButtonFooter(groupButton: DialogGroupButton): void {
    this.param.GroupBtn = groupButton;
  }

  protected closeDialog(data = null): void {
    const dialogResult: DialogResult = {
      DialogResult: DialogResultEnum.CLOSE,
      IsParent: FlgEnum.FALSE,
      Data: data
    };
    this.param.$event.next(dialogResult);
  }

  protected startProgressBar() {
    this.param.$callApi.next(FlgEnum.TRUE);
  }

  protected stopProgressBar() {
    this.param.$callApi.next(FlgEnum.FALSE);
  }

  protected setHiddenFooter(): void {
    this.param.IsFooter = FlgEnum.FALSE;
  }

  protected setHiddenHeader(): void {
    this.param.IsHeader = FlgEnum.FALSE;
  }

  protected setHiddenButtonClose(): void {
    this.param.IsBtnClose = FlgEnum.FALSE;
  }

}
