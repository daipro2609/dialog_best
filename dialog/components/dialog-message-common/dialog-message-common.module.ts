import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogMessageCommonComponent } from './dialog-message-common.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [DialogMessageCommonComponent],
  declarations: [DialogMessageCommonComponent],
  entryComponents: [DialogMessageCommonComponent],
})
export class DialogMessageCommonModule { }
