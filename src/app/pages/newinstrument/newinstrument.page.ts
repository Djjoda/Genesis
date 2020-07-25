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

  ngOnInit() {

  }

  saveInstrument(){
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
        if (this.resolution.length > 0 && this.resolution.includes(',') == false) {
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
          this.toast('Please enter the resolution of the instrument','warning');
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

}
