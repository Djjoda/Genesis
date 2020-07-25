import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public auth: AuthService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public ruter: Router,



  ) { }

  hiddenlogin: boolean = false;
  hiddenregister: boolean = true;

  mail: string = '';
  pass: string = '';

  name: string = '';
  comp: string = '';
  mailreg: string = '';
  passreg: string = '';
  passreg2: string = '';
  terms: boolean = false;

  loading: any;

  ngOnInit() {
  }

  showRegister(enable){
    switch (enable) {
      case 1:
        this.hiddenlogin = true;
        this.hiddenregister = false;        
        break;
      case 2:
        this.hiddenlogin = false;
        this.hiddenregister = true;        
        break;    
      default:
        break;
    }  

  }

  login(){
    if (this.mail.includes('@') && this.mail.includes('.')) {
      this.presentLoading();
      this.auth.login(this.mail,this.pass).then((res)=>{
        setTimeout(()=>{ this.loading.dismiss() }, 1000);
        this.ruter.navigate(['/tabs']);
      }).catch((err)=>{
        setTimeout(()=>{ this.loading.dismiss() }, 1000);
        if (err ="The password is invalid or the user does not have a password.") {
          this.presentToast("The password is invalid or the user does not have a password",'warning');          
        }   
      });      
    } else {
      this.presentToast("The email is invalid",'warning');      
    }    
  }

  sigin(){
        
    if (this.name.length > 0) {
      if (this.comp.length > 0) {
        if (this.mailreg.includes('@') && this.mailreg.includes('.')) {
          if (this.passreg.length >= 6) {
            if (this.passreg == this.passreg2) {              
              if (this.terms == true) {                
                  this.presentLoading();
                  var data = {"body": {
                    "profile":{
                      "name": this.name,
                      "comp": this.comp,
                      "mail": this.mailreg,
                      "id": ""
                    },
                    "instruments": []
                  }};
                  this.auth.sigin(this.mailreg,this.passreg2,data).then((res)=>{
                    setTimeout(()=>{ this.loading.dismiss() }, 1000);
                    this.ruter.navigate(['/tabs']);
                  }).catch((err)=>{
                    console.log(err.message); 
                    setTimeout(()=>{ this.loading.dismiss() }, 1000);
                    if (err.message == "The email address is already in use by another account.") {
                      this.presentToast("The email address is already in use by another account",'warning');                 
                    }  
                  });            
                             
              } else {
                this.presentToast("Please read and accept the terms and conditions",'warning');
              } 
            } else {
              this.presentToast("Passwords do not match",'warning');      
            }            
          } else {
            this.presentToast("The password should be more than 5 characters",'warning');      
          }      
        } else {
          this.presentToast("Please enter a valid email",'warning');      
        }
      } else {
        this.presentToast("Please enter a name of your company",'warning');      
      }      
    } else {
      this.presentToast("Please enter a name",'warning');                 
    }
    
  }


  Terms(event){
    this.terms = event.detail.checked;
  }

  


  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: "top"
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
