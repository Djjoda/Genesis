import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-newinstrument',
  templateUrl: './newinstrument.page.html',
  styleUrls: ['./newinstrument.page.scss'],
})
export class NewinstrumentPage implements OnInit {

  constructor(
    public modal: ModalController,
    public api: ApiService,
    public toastController: ToastController,
    public loadingController: LoadingController



  ) { }

  loading: any;

  id: string;

  amounts: string = '';
  chemicals: string = '';
  energy: string = '';
  name: string = '';
  preparation: string = '';
  resolution: string = '';
  weight: string = '';
  working: string = '';
  meassurment: string = '';
  plates: string = '';
  separation: string = '';
  ratio: string = '';

  hiddenresolution: boolean = true;

  ngOnInit() {

  }

  saveInstrument(){

    this.amounts = this.amounts.replace(',','.');
    this.chemicals = this.chemicals.replace(',','.');
    this.energy = this.energy.replace(',','.');
    this.preparation = this.preparation.replace(',','.');
    this.resolution = this.resolution.replace(',','.');
    this.weight = this.weight.replace(',','.');
    this.working = this.working.replace(',','.');
    this.meassurment = this.meassurment.replace(',','.');
    

    var data = {"body":{
      "id": this.id,
      "instrument": {
          "amounts": this.amounts,
          "chemicals": this.chemicals,
          "energy": this.energy,
          "name": this.name,
          "preparation": this.preparation,
          "resolution": this.resolution,
          "weight": this.weight,
          "working": this.working,
          "meassurment": this.meassurment
      }
    }};

    if (this.name.length > 0) {
      if (this.weight.length > 0 && this.weight.includes(',') == false) {
        if (this.resolution.length > 0 && this.resolution.includes(',') == false && this.resolution != 'NaN' && this.resolution != 'Infinity') {
          if (this.working.length > 0 && this.working.includes(',') == false) {
            if (this.chemicals.length > 0 && this.chemicals.includes(',') == false) {
              if (this.amounts.length > 0 && this.amounts.includes(',') == false) {
                if (this.preparation.length > 0 && this.preparation.includes(',') == false) {
                  if (this.meassurment.length > 0 && this.meassurment.includes(',') == false) {
                    if (this.energy.length > 0 && this.energy.includes(',') == false) {
                      this.presentLoading();
                      this.api.nuinstrument(data).then(res=>{
                        this.toast('Instrument added successfully','success');
                        setTimeout(()=>{ 
                          this.loading.dismiss();
                          this.closeNewinstrument(1);
                        }, 300);
                      }).catch(err=>{
                        console.log(err);
                        setTimeout(()=>{ this.loading.dismiss() }, 300);
                      });        
                    } else {
                      this.toast('Please enter the energy of the instrument','warning');
                    }
                  } else {
                    this.toast('Please enter the meassurment of the instrument','warning');
                  }
                } else {
                  this.toast('Please enter the preparation of the instrument','warning');
                }
              } else {
                this.toast('Please enter the amounts of the instrument','warning');
              } 
            } else {
              this.toast('Please enter the chemicals of the instrument','warning');
            } 
          } else {
            this.toast('Please enter the working of the instrument','warning');
          } 
        } else {
          this.toast('Please enter a correct value for the resolution of the instrument','warning');
        } 
      } else {
        this.toast('Please enter the weight of the instrument','warning');
      }      
    } else {
      this.toast('Please enter the name of the instrument','warning');
    }
  }

  closeNewinstrument(enable) {   
    this.modal.dismiss({enable});
  }

  async toast(header,color) {
    const toast = await this.toastController.create({
      header,      
      position: 'top',
      color,
      duration: 2000      
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Wait please...',
      backdropDismiss: false,
      translucent: false,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  typeinstrument(event){
    switch (event.detail.value) {
      case "specter":
        this.resolution = '';
        this.hiddenresolution = true;
        break;
      case "separation":
        this.resolution = '';
        this.hiddenresolution = false;
        break;
    
      default:
        break;
    }
  }

  doSometing(){
    this.plates = this.plates.replace(',','.');
    this.separation = this.separation.replace(',','.');
    this.ratio = this.ratio.replace(',','.');

    this.resolution = ((1/4) * Math.sqrt(parseFloat(this.plates)) * (((parseFloat(this.separation)-1)/parseFloat(this.separation))) * (parseFloat(this.ratio)/(parseFloat(this.ratio)-1))).toFixed(2);
  }

}
