import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NewinstrumentPageModule } from '../pages/newinstrument/newinstrument.module';
import { NewinstrumentPage } from '../pages/newinstrument/newinstrument.page';

@NgModule({
  entryComponents:[
    NewinstrumentPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    NewinstrumentPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
