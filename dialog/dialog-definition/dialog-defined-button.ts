
import { DialogResultEnum } from '@core/enum';
import { DialogButton } from '../models';

export class DialogDefinedButton {
  static CancelBtn: DialogButton = { Id: 'CancelBtn', Text: 'いいえ', Class: 'btn-secondary', DialogResult: DialogResultEnum.CANCEL };
  static BackBtn: DialogButton = { Id: 'BackBtn', Text: '戻る', Class: 'btn-secondary', DialogResult: DialogResultEnum.BACK };
  static OkBtn: DialogButton = { Id: 'OkBtn', Text: 'OK', Class: 'btn-secondary', DialogResult: DialogResultEnum.OK };
  static ConfirmBtn: DialogButton = { Id: 'ConfirmBtn', Text: 'はい', Class: 'btn-danger', DialogResult: DialogResultEnum.OK };
  static InputBtn: DialogButton = { Id: 'InputBtn', Text: '確認', Class: 'btn-warning', DialogResult: DialogResultEnum.OK };
  static ExecuteBtn: DialogButton = { Id: 'ExecuteBtn', Text: '実行', Class: 'btn-danger', DialogResult: DialogResultEnum.OK };
}
