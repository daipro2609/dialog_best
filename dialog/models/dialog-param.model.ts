import { Subject } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { DialogGroupButton } from './dialog-group-button.model';
import { DialogResult } from './dialog-result.model';
import { DialogOptions } from './dialog-options.model';
import { FlgEnum } from '@core/enum';

export interface DialogParam<D> {
  Component?: ComponentType<any>;
  Title?: string;
  IsHeader?: FlgEnum;
  IsBtnClose?: FlgEnum;
  Data: D;
  IsFooter?: FlgEnum;
  GroupBtn?: DialogGroupButton;
  OptionsDialog?: DialogOptions;
  $event?: Subject<DialogResult>;
  $callApi?: Subject<FlgEnum>;
}
