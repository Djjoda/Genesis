import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { NewinstrumentPage } from '../pages/newinstrument/newinstrument.page';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import * as HighCharts from "highcharts";

import * as MathJS from 'mathjs'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    public modal: ModalController,
    public toastController: ToastController,
    public api: ApiService,
    public auth: AuthService,
    public loadingController: LoadingController



  ) {}

  title: string = 'Spacecraft Capacity';

  hiddenmenu: boolean = false;
  hiddentitle: boolean = false;
  hiddeninstrument: boolean = true;
  hiddenresults: boolean = true;
  hiddenresults1: boolean = true;
  hiddenresults2: boolean = true;
  hiddenresults3: boolean = true;
  hiddenresults4: boolean = true;
  hiddenresults5: boolean = true;
  hiddenresults6: boolean = false;

  hiddencollecting: boolean = true;
  hiddenpuntuallity: boolean = true;


  spacecraft = {name: '', science: '84', energy: '1050', travel: '0.75', research: 'Collecting data from huge area'};

  instruments = [];
  uinstruments = [];

  instrument = [];
  instrumentGtest = [];
  instrumentCompare = [];
  instrumentOperating = [];

  resCompare = [];
  resOperating = [];

  id: any;
  loading: any;

  realCompare = {
    name: 'Values of G-Test',
    weight: 30,      //Weight of the instrument with its accesories (kg)     
    preparation: 2, //Sample preparation time for 1 sample (minute)
    energy: 10,   //Energy requeriment for preparing & measuring 1 sample (Wh)
    working: 5720, //Instrument working (hours)
    amounts: 12, //Total amounts of chemicals for preparing & measuring 1 sample (ml)
    meassurment: 4, //Sample meassurment time for 1 sample (minute)
    resolution: 3,  //Resolution
    chemicals: 45,   //Chemicals (years)
    // instruments: 30
  }

  colors = ['#3880ff', '#3dc2ff', '#5260ff', '#2dd36f', '#ffc409', '#eb445a', '#222428', '#92949c', '#815800', '#a2c700', '#00c79c', '#0098c7', '#7700c7', '#c700ac', '#c7004c', '#2c0000', '#03002c', '#052c17', '#473409', '#4b1111'];

  instrumentSelected: string = '';
  flagresults: string = '6';


  ngOnInit(){
    

    this.loadData();
    

  }

  loadData(){

    this.instruments = [];
    this.uinstruments = [];

    this.instrument = [];
    this.instrumentGtest = [];
    this.instrumentCompare = [];
    this.instrumentOperating = [];
    this.resCompare = [];
    this.resOperating = [];


    this.presentLoading();
    this.auth.uid().then((res)=>{
      this.id = res;   
      this.api.uinstruments(this.id).then(res=>{
        var resp: any = res;
        this.uinstruments = resp.body.instruments;
        this.api.instruments().then(res=>{
          var resp: any = res;
          this.instruments = resp.body.instruments;
          setTimeout(()=>{ this.loading.dismiss() }, 500);
        }).catch(err=>{
          console.log(err);  
          setTimeout(()=>{ this.loading.dismiss() }, 500);    
        });    
      }).catch(err=>{
        console.log(err);
        setTimeout(()=>{ this.loading.dismiss() }, 500);      
      });  
    }).catch(err=>{
      console.log(err);
      setTimeout(()=>{ this.loading.dismiss() }, 500);      
    });   

  }

  nextMenu(val){
    console.log(val);
    
    switch (val) {
      case 0:   
        
        this.title = 'Spacecraft Capacity';
        this.hiddenmenu = false;
        this.hiddentitle = false;
        this.hiddeninstrument = true;
        this.hiddenresults = true;

        break;
      case 1:
        
        if (this.spacecraft.name.length > 0) {
          if (this.spacecraft.science.length > 0 && this.spacecraft.science.includes(',') == false) {
            if (this.spacecraft.energy.length > 0 && this.spacecraft.energy.includes(',') == false) {
              if (this.spacecraft.travel.length > 0 && this.spacecraft.travel.includes(',') == false) {
                this.title = 'Instruments to Compare';
                this.hiddenmenu = true;
                this.hiddentitle = false;
                this.hiddeninstrument = false;
                this.hiddenresults = true;    
                this.hiddenpuntuallity = true;       
                this.hiddencollecting = true;       

              } else {
                this.toast('Please enter a value of Travel Time to the Planet (years)','warning');
              }          
            } else {
              this.toast('Please enter a value of Energy Supply (W/h)','warning');
            }          
          } else {
            this.toast('Please enter a value of Science Payload (Kg)','warning');
          }
        } else {
          this.toast('Please enter a name of experiment','warning');
        }        
        break;
      case 2:
        if (this.instrument.length > 1) {
          this.getOperating();

          this.charRsults();
          this.charRsults2();
          this.charRsults3();

          this.title = '';
          this.hiddenmenu = true;
          this.hiddentitle = true;
          this.hiddeninstrument = true;
          this.hiddenresults = false;  
          
          

        } else {
          this.toast('Please select 2 or more instruments','warning');
        }        
        break;
    
      default:
        break;
    }
    
  }

  async openNewinstrument() {    
    const ctrmodal = await this.modal.create({
      component: NewinstrumentPage, 
      backdropDismiss: false,
      componentProps: {id: this.id}
    });
    await ctrmodal.present(); 
    const { data } = await ctrmodal.onDidDismiss();  
    if (data.enable == 1) {
      this.loadData();
    }
  }

  segmentChanged(event){
    this.flagresults = event.detail.value;
    switch (event.detail.value) {
      case '1':
        this.hiddenresults1 = false;
        this.hiddenresults2 = true;
        this.hiddenresults3 = true;
        this.hiddenresults4 = true;
        this.hiddenresults5 = true;
        this.hiddenresults6 = true;
        this.hiddencollecting = true;
        this.hiddenpuntuallity = true;
        break;
      case '2':
        
        this.hiddenresults1 = true;
        this.hiddenresults2 = false;
        this.hiddenresults3 = true;
        this.hiddenresults4 = true;
        this.hiddenresults5 = true;
        this.hiddenresults6 = true;
        this.hiddencollecting = true;
        this.hiddenpuntuallity = true;
        break;
      case '3':        
        this.hiddenresults1 = true;
        this.hiddenresults2 = true;
        this.hiddenresults3 = false;
        this.hiddenresults4 = true;
        this.hiddenresults5 = true;
        this.hiddenresults6 = true;
        this.hiddencollecting = true;
        this.hiddenpuntuallity = true;
        break;
      case '4':
        this.resCompare = []
        this.instrumentCompare.forEach(instrument => {
          var pweight = this.chi2pdf(instrument.weight,this.realCompare.weight);
          var penergy = this.chi2pdf(instrument.energy,this.realCompare.energy);
          var ptime = 0;
          if (this.spacecraft.research == 'Collecting data from huge area') {
            ptime = this.chi2pdf(instrument.meassurment,this.realCompare.meassurment);
          } else {
            ptime = this.chi2pdf(instrument.working,this.realCompare.working);
          }
  
          this.resCompare.push({name: instrument.name, pweight, penergy, ptime});                
        });
  
        this.hiddenresults1 = true;
        this.hiddenresults2 = true;
        this.hiddenresults3 = true;
        this.hiddenresults4 = false;
        this.hiddenresults5 = true;
        this.hiddenresults6 = true;
        this.hiddencollecting = true;
        this.hiddenpuntuallity = true;
        break;
      case '5':
        this.getOperating();

        this.hiddenresults1 = true;
        this.hiddenresults2 = true;
        this.hiddenresults3 = true;
        this.hiddenresults4 = true;
        this.hiddenresults5 = false;
        this.hiddenresults6 = true;
        this.hiddencollecting = true;
        this.hiddenpuntuallity = true;
        break;
      case '6':
        this.charRsults();
        this.charRsults2();
        this.charRsults3();

        this.hiddenresults1 = true;
        this.hiddenresults2 = true;
        this.hiddenresults3 = true;
        this.hiddenresults4 = true;
        this.hiddenresults5 = true;
        this.hiddenresults6 = false;
        if (this.spacecraft.research == 'Collecting data from huge area') {
          this.hiddencollecting = false;
          this.hiddenpuntuallity = true;
        } else {
          this.hiddencollecting = true;
          this.hiddenpuntuallity = false;
        }        
        break;
    
      default:
        break;
    }
  }

  getOperating(){
    this.resOperating = [];
    var maxCollecting = [];


    this.instrumentOperating.forEach(instrument => {
      var t_mweight=parseFloat((Math.abs(parseFloat(this.spacecraft.science)-instrument.weight)/(instrument.amounts/1000)).toFixed(2));
      var sum = parseFloat(((instrument.preparation + instrument.meassurment)/525600).toFixed(2));
      var otime = '';       
      var t_mtime = 0;
      var t_mtime2 = 0;

      if (instrument.chemicals < this.spacecraft.travel) {
        otime = 'No function! the shelf life of instruments reached the resolution of the mision';
        t_mtime = 0;
        t_mtime2 = 0;
      } else {
        t_mtime = parseFloat(((instrument.chemicals - parseFloat(this.spacecraft.travel))/sum).toFixed(2));
        t_mtime2 = instrument.chemicals - parseFloat(this.spacecraft.travel);
      }

      var time = 0;
      var free = 0;
      var val = 0;

      if (t_mweight > t_mtime){
        val = parseFloat((Math.abs((t_mweight - t_mtime)*(instrument.preparation/1000))).toFixed(2));
        time = t_mtime;
        free = val;
      } else {
        time = t_mweight;
        free = 0;
      }

      this.resOperating.push({name: instrument.name, time, sample: t_mtime2, free});
      
      maxCollecting.push(t_mtime2);
      
    });

    if (this.flagresults == '6') {
      if (this.spacecraft.research == 'Collecting data from huge area') {
        for (let i = 0; i < maxCollecting.length; i++) {
          if (Math.max(...maxCollecting) == maxCollecting[i]) {
            this.instrumentSelected = this.resOperating[i].name;
          }
        }  
        this.hiddencollecting = false;    
        this.hiddenpuntuallity = true;    
      } else {
        this.hiddencollecting = true;    
        this.hiddenpuntuallity = false;
        var maxresolution = [];
        var maxmeassurement = [];
        var posresolution = 0;
        var posmeassurement = 0;

        this.instruments.forEach(element => {
          maxresolution.push(element.resolution);
          maxmeassurement.push(element.meassurment);
        });

        console.log(maxresolution,maxmeassurement);
        
        for (let i = 0; i < maxresolution.length; i++) {
          if (Math.max(...maxresolution) == maxresolution[i]) {
            posresolution = i;            
          }
        } 
        for (let i = 0; i < maxmeassurement.length; i++) {
          if (Math.max(...maxmeassurement) == maxmeassurement[i]) {
            posmeassurement = i;            
          }
        }  

        if (posresolution == posmeassurement) {
          this.instrumentSelected = this.resOperating[posresolution].name;
        }

      }      
    }   
    
    
  }

  researchSelect(event){
    this.spacecraft.research = event.detail.value;
  }

  instrumentSelect(event,inst){
    
    if (event.detail.checked == true) {
      this.instrument.push(inst);
      this.instrumentGtest = JSON.parse( JSON.stringify( this.instrument ) );
      this.instrumentCompare = JSON.parse( JSON.stringify( this.instrument ) );
      this.instrumentOperating = JSON.parse( JSON.stringify( this.instrument ) );

      this.instrumentGtest.forEach(instrument => {
        instrument.weight = this.gtest(instrument.weight,this.realCompare.weight);
        instrument.energy = this.gtest(instrument.energy,this.realCompare.energy);
        instrument.amounts = this.gtest(instrument.amounts,this.realCompare.amounts);
        instrument.preparation = this.gtest(instrument.preparation,this.realCompare.preparation);
        instrument.meassurment = this.gtest(instrument.meassurment,this.realCompare.meassurment);
        instrument.resolution = this.gtest(instrument.resolution,this.realCompare.resolution);
        instrument.chemicals = this.gtest(instrument.chemicals,this.realCompare.chemicals);
        instrument.working = this.gtest(instrument.working,this.realCompare.working);
      });

    } else {
      for (let i = 0; i < this.instrument.length; i++) {
        if (inst.name == this.instrument[i].name) {
          this.instrument.splice(i,1);
          this.instrumentGtest.splice(i,1);
          this.instrumentCompare.splice(i,1);
          this.instrumentOperating.splice(i,1);
        }        
      }     
    }
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

  gtest(val,compare){
    var gresult = 2*(val*Math.log(val/compare));
    return parseFloat(gresult.toFixed(2));
  }

  chi2pdf(x,a){
    var result = 1 /(2 * MathJS.gamma(a/2) * Math.pow(x/2, (a/2)-1) * Math.exp(-x/2));
    return parseFloat(result.toFixed(2));
  }

  charRsults(){
    var series = [];
    var i = 0;
    this.instrument.forEach(element => {
      series.push({name: element.name, type: null, data: [parseFloat(element.meassurment)], color: this.colors[i]});
      i = i+1;


    });

    HighCharts.chart("chart1", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Time of Measurement (min)"
      },
      xAxis: {
        categories: ["Instruments"]

      },
      yAxis: {
        title: {
          text: "min"
        }
      },      
      series
    });
  }

  charRsults2(){
    var series = [];
    var i = 0;
    this.instrument.forEach(element => {
      series.push({name: element.name, type: null, data: [parseFloat(element.resolution)], color: this.colors[i]});
      i = i+1;
    });

    HighCharts.chart("chart2", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Resolution"
      },
      xAxis: {
        categories: ["Instruments"]
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      series 
    });
  }

  charRsults3(){
    var series = [];
    var i = 0;
    this.resOperating.forEach(element => {
      series.push({name: element.name, type: null, data: [parseFloat(element.sample)], color: this.colors[i]});
      i = i+1;
    });

    HighCharts.chart("chart3", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Samples"
      },
      xAxis: {
        categories: ["Instruments"]
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      series 
    });
  }


  openGenesis(){
    window.open("https://damaresearch.com/gen111/","_blank");
  }


}
