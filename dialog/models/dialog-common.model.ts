import { FormGroup } from '@angular/forms';
import { DialogCommonTypeEnum } from '@core/enum';

export interface DialogCommonModel {
  Type: DialogCommonTypeEnum;
  Content?: string;
  ErrorMap?: any;
  FormGroup?: FormGroup;
}
