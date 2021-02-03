import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogComponent } from './components/dialog/dialog.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { DialogMessageCommonModule } from './components/dialog-message-common/dialog-message-common.module';
import { DialogFactoryService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    PortalModule,
    MatProgressBarModule,
    DialogMessageCommonModule
  ],
  exports: [DialogComponent],
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  providers: [DialogFactoryService]
})
export class DialogComponentModule { }
