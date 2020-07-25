import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewinstrumentPage } from './newinstrument.page';

const routes: Routes = [
  {
    path: '',
    component: NewinstrumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewinstrumentPageRoutingModule {}
