import { GroupClassButton } from '../dialog-definition';
import { DialogButton } from './dialog-button.model';

export interface DialogGroupButton {
  Class: GroupClassButton[];
  OptionsBtn?: DialogButton[];
}
