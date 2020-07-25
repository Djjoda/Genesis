import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewinstrumentPageRoutingModule } from './newinstrument-routing.module';

import { NewinstrumentPage } from './newinstrument.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewinstrumentPageRoutingModule
  ],
  declarations: [NewinstrumentPage]
})
export class NewinstrumentPageModule {}
