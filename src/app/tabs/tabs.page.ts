import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

  openGenesis(){
    window.open("https://genesissus.eu/gen111/?fbclid=IwAR1zx2gFwLAt56zjPPaAFbCeQJfDaIBmFYjJ4IVcyjQLePTaKs5nMihFFmg","_blank");
  }

}
