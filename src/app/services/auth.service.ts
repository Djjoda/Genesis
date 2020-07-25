import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private api: ApiService
  ) { }

  sigin(mail: string, pass: string, data: any){
    return new Promise ((resolve,rejected)=>{
      this.AFauth.createUserWithEmailAndPassword(mail,pass).then((res)=>{
        data.body.profile.id =  res.user.uid;
        this.api.newuser(data).then((res)=>{ 
          var resp: any;
          resp = res;                 
          resolve(res);
        }).catch((err)=>{
          rejected(err);
        });
      }).catch((err)=>{
        rejected(err);
      });

    })    
  }

  login(mail: string, pass: string){

    return new Promise ((resolve,rejected)=>{
      this.AFauth.signInWithEmailAndPassword(mail,pass).then((res)=>{
        resolve(res);      
      }).catch((err)=>{
        rejected(err);
      });

    })    

  }

  logout(){
    this.AFauth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }


  uid(){
    return new Promise ((resolve,rejected)=>{
      this.AFauth.user.subscribe((res)=>{
        if (isNullOrUndefined(res.uid)) {
          rejected('no hay UID')
        }else{
          resolve(res.uid);
        }
      });
    })
  }

}
