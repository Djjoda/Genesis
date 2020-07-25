import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public loadingController: LoadingController


  ) {}

  id: any;
  loading: any;
  user: any;

  name: string = '';
  mail: string = '';
  comp: string = '';


  ngOnInit(){

    this.presentLoading();
    this.auth.uid().then((res)=>{
      this.id = res;   
      this.api.user(this.id).then(res=>{
        var resp: any = res;
        this.user = resp.body.user;
        this.name = this.user.profile.name;
        this.mail = this.user.profile.mail;
        this.comp = this.user.profile.comp;
        setTimeout(()=>{ this.loading.dismiss() }, 300);
      }).catch(err=>{
        console.log(err);
        setTimeout(()=>{ this.loading.dismiss() }, 300);
      })
    }).catch(err=>{
      console.log(err);
      setTimeout(()=>{ this.loading.dismiss() }, 300);      
    });   

  }

  singout(){
    this.auth.logout();
    window.location.reload();
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
