import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient

  ) { }

  newuser(data){
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http.post(
        `https://us-central1-genesis-de7d3.cloudfunctions.net/api/nuser`, data,
        { observe: "response" })
        .subscribe((resp: any) => {
          resolve(resp);
        },(error) => {
          reject(error);
        });
    });
  }

  nuinstrument(data){
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http.post(
        `https://us-central1-genesis-de7d3.cloudfunctions.net/api/nuinstru`, data,
        { observe: "response" })
        .subscribe((resp: any) => {
          resolve(resp);
        },(error) => {
          reject(error);
        });
    });
  }

  instruments(){
    return new Promise((resolve, reject) => {
      this.http.get(
        `https://us-central1-genesis-de7d3.cloudfunctions.net/api/instruments`,
        { observe: "response" })
        .subscribe((resp: any) => {
          resolve(resp);
        },(error) => {
          reject(error);
        });
    });
  }

  uinstruments(id){
    return new Promise((resolve, reject) => {
      this.http.get(
        `https://us-central1-genesis-de7d3.cloudfunctions.net/api/uinstruments?id=${id}`,
        { observe: "response" })
        .subscribe((resp: any) => {
          resolve(resp);
        },(error) => {
          reject(error);
        });
    });
  }

  user(id){
    return new Promise((resolve, reject) => {
      this.http.get(
        `https://us-central1-genesis-de7d3.cloudfunctions.net/api/user?id=${id}`,
        { observe: "response" })
        .subscribe((resp: any) => {
          resolve(resp);
        },(error) => {
          reject(error);
        });
    });
  }

  
}
