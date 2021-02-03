import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { DialogOptions, DialogParam, DialogResult } from '../models';
import { FormGroup } from '@angular/forms';

export interface IDialogBuilder {
  openDialog(component: ComponentType<any>, dialogParam: DialogParam<any>): Observable<DialogResult>;
  openCommonInformationDialog(title: string, content: string, options: DialogOptions): Observable<DialogResult<any>> | any;
  openCommonConfirmDialog(title: string, content: string, options: DialogOptions): Observable<DialogResult<any>> | any;
  openCommonFormGroupErrorDialog(formGroup: FormGroup, errorMap: any, options: DialogOptions): Observable<DialogResult<any>> | any;
  openCommonErrorDialog(content: string, options: DialogOptions): Observable<DialogResult<any>> | any;
  openCommonInformationWithoutTitleDialog(content: string, options: DialogOptions): Observable<DialogResult<any>> | any;
}
