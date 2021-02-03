import { Component, OnInit, ViewChild, TemplateRef, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl } from '@angular/forms';

import { DialogCommonTypeEnum, DialogResultEnum } from '@core/enum';
import { DialogDefinedButton, GroupClassButton } from '@core/dialog/dialog-definition';
import { DialogParam, DialogGroupButton, DialogCommonModel } from '@core/dialog/models';
import { BaseDialogComponent } from '../dialog-base/base-dialog.component';

@Component({
  selector: 'app-dialog-message-common',
  templateUrl: './dialog-message-common.component.html',
  styleUrls: ['./dialog-message-common.component.scss']
})
export class DialogMessageCommonComponent extends BaseDialogComponent implements OnInit {
  @ViewChild('information') information: TemplateRef<any>;
  @ViewChild('widthOut') widthOut: TemplateRef<any>;
  @ViewChild('confirm') confirm: TemplateRef<any>;
  @ViewChild('error') error: TemplateRef<any>;
  private errorMaps: InjectionToken<any>;
  constructor(@Inject(MAT_DIALOG_DATA) public param: DialogParam<DialogCommonModel>) {
    super(param);
  }

  ngOnInit(): void {
    this.createDialogByTypeButton(this.param.Data.Type);
    if (this.param.Data.Type === DialogCommonTypeEnum.Error && this.param.Data.ErrorMap) {
      this.errorMaps = new InjectionToken('FORM_ERROR', { providedIn: 'root', factory: () => this.param.Data.ErrorMap });
    }
  }

  ngOnSubmitDialog(event: DialogResultEnum): void {
    this.closeDialog(event);
  }

  public getTemplate(): TemplateRef<any> {
    if (this.param.Data.Type === DialogCommonTypeEnum.Information) {
      return this.information;
    } else if (this.param.Data.Type === DialogCommonTypeEnum.WidthOut) {
      return this.widthOut;
    } else if (this.param.Data.Type === DialogCommonTypeEnum.Confirm) {
      return this.confirm;
    } else {
      return this.error;
    }
  }

  public getContent(): string {
    if (this.param.Data.Type === DialogCommonTypeEnum.Error && this.param.Data.ErrorMap && this.param.Data.FormGroup) {
      return this.getFormValidationErrors();
    } else {
      return this.param.Data.Content;
    }
  }

  private getFormValidationErrors(): string {
    let errorsHtmlList = '';
    const formControls = this.param.Data.FormGroup;
    Object.keys(formControls).forEach(key => {
      const control: FormControl = formControls[key];
      if (control.errors != null) {
        const formControlName = this.getControlName(control);
        const errorsOfControl = Object.keys(control.errors);
        const errorFirstKey = errorsOfControl[0];
        const getError = this.errorMaps[`${formControlName}-${errorFirstKey}`];
        let text = `${formControlName}-${errorFirstKey}`;
        if (getError) {
          text = getError(errorsOfControl[errorFirstKey]);
        }
        errorsHtmlList += `<div class="mb-2">${text}</div>`;
      }
    });
    return errorsHtmlList;
  }

  private getControlName(control: AbstractControl): string | null {
    const formGroup = control.parent.controls;
    return Object.keys(formGroup).find(name => control === formGroup[name]) || null;
  }

  private createDialogByTypeButton(type: DialogCommonTypeEnum) {
    let groupBtn: DialogGroupButton = null;
    switch (type) {
      case DialogCommonTypeEnum.Confirm:
        groupBtn = { Class: [GroupClassButton.LEFT], OptionsBtn: [DialogDefinedButton.CancelBtn, DialogDefinedButton.ConfirmBtn] };
        this.setStatusButtonFooter(groupBtn);
        break;
      case DialogCommonTypeEnum.Information:
        groupBtn = { Class: [GroupClassButton.CENTER], OptionsBtn: [DialogDefinedButton.BackBtn] };
        this.setStatusButtonFooter(groupBtn);
        break;
      case DialogCommonTypeEnum.WidthOut:
      case DialogCommonTypeEnum.Error:
        groupBtn = { Class: [GroupClassButton.CENTER + GroupClassButton.NO_BORDER], OptionsBtn: [DialogDefinedButton.OkBtn] };
        this.setStatusButtonFooter(groupBtn);
        this.setHiddenHeader();
        break;
      default:
        groupBtn = { Class: [GroupClassButton.CENTER], OptionsBtn: [DialogDefinedButton.OkBtn] };
        this.setStatusButtonFooter(groupBtn);
        this.setHiddenHeader();
        break;
    }
  }
}
