import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  SkyUIConfigService
} from '@skyux/core';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  SkyConfirmModule
} from '@skyux/modals';

import {
  SkyPopoverModule
} from '@skyux/popovers';

import {
  SkyListsResourcesModule
} from '../shared';

import {
  SkyFilterToolbarComponent
} from './filter-toolbar.component';

@NgModule({
  providers: [
    SkyUIConfigService
  ],
  declarations: [
    SkyFilterToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyConfirmModule,
    SkyI18nModule,
    SkyIconModule,
    SkyListsResourcesModule,
    SkyPopoverModule,
    SkyToolbarModule
  ],
  exports: [
    SkyFilterToolbarComponent
  ],
  entryComponents: [
    SkyFilterToolbarComponent
  ]
})
export class SkyFilterToolbarModule { }
