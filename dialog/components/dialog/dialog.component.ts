import { Component, Inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { DialogResultEnum, FlgEnum } from '@core/enum';
import { DialogParam, DialogResult, DialogButton } from '@core/dialog/models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  public portal: ComponentPortal<ComponentType<any>>;
  public isProcessAction: FlgEnum;
  constructor(
    private cdf: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public param: DialogParam<any>,
  ) {
    this.param.$event = new Subject<DialogResult>();
    this.param.$callApi = new Subject<FlgEnum>();
  }

  ngOnInit() {
    this.setShowProgressBar(FlgEnum.FALSE);
    this.subscribeMaster();
    this.portal = new ComponentPortal(this.param.Component);
  }

  ngAfterViewInit() {
    this.updateOptionsDialog();
    this.cdf.detectChanges();
  }

  public onClickCloseDialog(data: DialogResult = null) {
    this.dialogRef.close(data);
  }

  public onClickAction(button: DialogButton) {
    const dialogMode: DialogResult = {
      DialogResult: button.DialogResult,
      IsParent: FlgEnum.TRUE
    };
    this.param.$event.next(dialogMode);
  }

  public isShowsHeader(): boolean {
    return this.param?.IsHeader !== FlgEnum.FALSE;
  }

  public isShowFooter(): boolean {
    return this.param?.GroupBtn?.OptionsBtn?.length !== 0 || this.param?.IsFooter !== FlgEnum.FALSE;
  }

  public isHiddenButtonClose(): boolean {
    return this.param?.IsBtnClose !== FlgEnum.FALSE;
  }

  public buttonsFooter(): DialogButton[] {
    return this.param?.GroupBtn?.OptionsBtn ? this.param.GroupBtn.OptionsBtn : [];
  }

  public classElementGroupButton(): string {
    let classElement = '';
    if (this.param?.GroupBtn?.Class?.length > 0) {
      this.param?.GroupBtn?.Class.forEach(element => {
        classElement += element;
      });
    }
    return classElement;
  }

  public isShowProgressBar(): boolean {
    return this.isProcessAction === FlgEnum.TRUE;
  }

  public getStyleHeader(): string {
    return '';
  }

  private setShowProgressBar(isProcess: FlgEnum): void {
    this.isProcessAction = isProcess;
  }

  private updateOptionsDialog(): void {
    if (this.param?.OptionsDialog?.Position) {
      this.dialogRef.updatePosition({ top: `${this.param.OptionsDialog.Position}vh` });
    }
    if (this.param?.OptionsDialog?.Width) {
      this.dialogRef.updateSize(`${this.param.OptionsDialog.Width}px`);
    }
    if (this.param?.OptionsDialog?.DisableClose) {
      this.dialogRef.disableClose = this.param.OptionsDialog.DisableClose;
    }
  }

  private processAction(result: DialogResult) {
    switch (result.DialogResult) {
      case DialogResultEnum.CLOSE:
        this.onClickCloseDialog(result);
        // TODO
        break;
      default:
        break;
    }
  }

  private subscribeMaster(): void {
    this.keydownEventSubscribe();
    this.param?.$event
      .subscribe(result => {
        if (result && result.IsParent === FlgEnum.FALSE) {
          this.processAction(result);
        }
      });
    this.param?.$callApi
      .subscribe(result => {
        this.setShowProgressBar(result);
      });
  }

  private keydownEventSubscribe(): void {
    this.dialogRef.keydownEvents().subscribe(key => {
      if (key) {
        switch (key.keyCode) {
          case 27:
            this.dialogRef.close(null);
            break;
          default:
            this.emitKeyEventActions();
            break;
        }
      }
    });
  }

  private emitKeyEventActions() {
    /* TODO */
  }

  ngOnDestroy(): void {
    this.param = null;
  }

}
