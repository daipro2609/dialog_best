import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { DialogRefService } from './dialog-ref.service';
import { DialogMessageCommonComponent } from '../components/dialog-message-common/dialog-message-common.component';
import { DialogFactoryService } from './dialog-factory.service';
import { DialogCommonModel, DialogOptions, DialogParam, DialogResult, IDialogBuilder } from '../models';
import { DialogCommonTypeEnum, FlgEnum } from '@core/enum';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements IDialogBuilder {
  private dialogCommon: DialogRefService;
  private dialogMaster: DialogRefService;
  constructor(private dialogFactory: DialogFactoryService) { }

  public closeAll(): void {
    this.dialogFactory.closeAll();
  }

  private openDialogCommon(dialogParam: DialogParam<DialogCommonModel>): Observable<DialogResult<any>> | void {
    dialogParam.OptionsDialog = {
      Position: dialogParam?.OptionsDialog?.Position ? dialogParam.OptionsDialog.Position : 10,
      Width: dialogParam?.OptionsDialog?.Width ? dialogParam.OptionsDialog.Width : 450,
      DisableClose: dialogParam?.OptionsDialog?.DisableClose ? dialogParam.OptionsDialog.DisableClose : false
    };
    dialogParam.Component = DialogMessageCommonComponent;

    /* Open dialog first show */
    if (!this.dialogCommon || !this.dialogCommon?.matDialogRef?.componentInstance?.param) {
      this.dialogCommon = this.dialogFactory.createDialogCommon(dialogParam);
      return this.dialogCommon.afterClosed();
    } else {
      return new Observable(() => { });
    }
  }

  public openDialog(component: ComponentType<any>, dialogParam: DialogParam<any>): Observable<DialogResult> {
    dialogParam.OptionsDialog = {
      Width: dialogParam?.OptionsDialog?.Width ? dialogParam.OptionsDialog.Width : 750,
      Position: dialogParam?.OptionsDialog?.Position ? dialogParam.OptionsDialog.Position : 10,
      DisableClose: dialogParam?.OptionsDialog?.DisableClose ? dialogParam.OptionsDialog.DisableClose : true,
    };
    dialogParam.IsBtnClose = dialogParam?.IsBtnClose ? dialogParam?.IsBtnClose : FlgEnum.TRUE;
    dialogParam.Component = component;

    /* Open dialog first show */
    if (!this.dialogMaster || !this.dialogMaster?.matDialogRef?.componentInstance?.param) {
      this.dialogMaster = this.dialogFactory.createDialogBasic(dialogParam);
      return this.dialogMaster.afterClosed();
    } else {
      return new Observable(() => { });
    }
  }

  public openCommonInformationDialog(title: string, content: string, options: DialogOptions = {}): Observable<DialogResult<any>> | any {
    options.DisableClose = true;
    const dialogParam: DialogParam<DialogCommonModel> = {
      Title: title,
      OptionsDialog: options,
      Data: { Type: DialogCommonTypeEnum.Information, Content: content }
    };
    return this.openDialogCommon(dialogParam);
  }

  public openCommonConfirmDialog(title: string, content: string, options: DialogOptions = {}): Observable<DialogResult<any>> | any {
    options.DisableClose = true;
    const dialogParam: DialogParam<DialogCommonModel> = {
      Title: title,
      OptionsDialog: options,
      Data: { Type: DialogCommonTypeEnum.Confirm, Content: content }
    };
    return this.openDialogCommon(dialogParam);
  }

  public openCommonFormGroupErrorDialog(formGroup: FormGroup, errorMap: any, options: DialogOptions = {}): Observable<DialogResult<any>> | any {
    const dialogParam: DialogParam<DialogCommonModel> = {
      OptionsDialog: options,
      Data: { Type: DialogCommonTypeEnum.Error, ErrorMap: errorMap, FormGroup: formGroup }
    };
    return this.openDialogCommon(dialogParam);
  }

  public openCommonErrorDialog(content: string, options: DialogOptions = {}): Observable<DialogResult<any>> | any {
    const dialogParam: DialogParam<DialogCommonModel> = {
      OptionsDialog: options,
      Data: { Type: DialogCommonTypeEnum.Error, Content: content }
    };
    return this.openDialogCommon(dialogParam);
  }

  public openCommonInformationWithoutTitleDialog(content: string, options: DialogOptions = {}): Observable<DialogResult<any>> | any {
    const dialogParam: DialogParam<DialogCommonModel> = {
      OptionsDialog: options,
      Data: { Type: DialogCommonTypeEnum.WidthOut, Content: content }
    };
    return this.openDialogCommon(dialogParam);
  }

}
