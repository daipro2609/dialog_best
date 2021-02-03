import { DialogResultEnum } from '@core/enum';

export interface DialogButton {
  Text: string;
  Class?: string;
  Width?: number;
  Id: string;
  DialogResult: DialogResultEnum;
}
