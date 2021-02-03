import { DialogResultEnum, FlgEnum } from '@core/enum';

export interface DialogResult<D = any> {
  DialogResult: DialogResultEnum;
  IsParent?: FlgEnum;
  Data?: D;
}
