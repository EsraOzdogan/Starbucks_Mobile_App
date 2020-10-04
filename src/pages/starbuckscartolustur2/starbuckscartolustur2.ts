import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  Platform,
  AlertController,
  NavParams,
  Events,
  ToastController
} from "ionic-angular";
import { DatePicker } from "@ionic-native/date-picker";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-starbuckscartolustur2",
  templateUrl: "starbuckscartolustur2.html",
})
export class StarbucksCartOlustur2Page{




  userDetails: AngularFireObject<any>;
  private uid: string;
  public dogumtarihi: any;
  public tckimlik: any;
  public telno: any;
  public kartsifre:string;
  public cinsiyet: any;
  public cartolustur: {
    userID: string;
    cinsiyet: string;
    dogumtarihi: Date;
    tckimlik:number
    telno: number;
    kartsifre:string;

  };
  public sifreolustur:{
    userID: string;
    cinsiyet: number;
    dogumtarihi: Date;
    tckimlik:number
    telno: number;
    kartsifre:number
  }

  constructor(
    public datePicker: DatePicker,
    public navParams: NavParams,

    public navCtrl: NavController,
    public events: Events,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    private dbService: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {
    this.uid = localStorage.getItem("uid");


    
   

   }

   cartOlustur() {
    if (this.cinsiyet && this.tckimlik && this.dogumtarihi && this.telno  != undefined) {
      this.cartolustur = {
        userID: this.uid,
        cinsiyet: this.cinsiyet,
        tckimlik: this.tckimlik,
        dogumtarihi: this.dogumtarihi,
        telno: this.telno,
        kartsifre:this.kartsifre,
      };
      this.presentConfirm();
    } else if(this.cinsiyet && this.tckimlik && this.dogumtarihi && this.telno == undefined) {
      this.cartolustur = {
        userID: this.uid,
        cinsiyet: this.cinsiyet,
        tckimlik: this.tckimlik,
        dogumtarihi: this.dogumtarihi,
        telno: this.telno,
        kartsifre:this.kartsifre,
      };
      this.presentToast("Tckn hali hazırda kulanılmakta");

    }

    else {
      this.presentToast("Boş alanları doldurunuz");
    }
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "Kart Oluşturuluyor",
      message: "Devam etmek istiyor musun?",
      buttons: [
        {
          text: "Kapat",
          role: "cancel",
          handler: () => {
            this.presentToast("Kart oluşturulmadı");
            this.navCtrl.push("StarbucksCartOlustur2Page");
          }
        },
        {
          text: "Oluştur",
          handler: () => {
            this.dbService
              .list("starbuckscartolustur")
              .push(this.cartolustur)
              .then(res => {
                this.presentToast("Kartınız Oluşturuldu!! Kart şifreniz:"+this.cinsiyet+this.telno);
                this.dbService
                .list("starbuckscartolustur")
                .push(this.kartsifre=this.cinsiyet+ this.telno)


                this.navCtrl.push("StarbucksCartOlusturulduPage");
              });
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 10000,
      position: "top"
    });
    toast.present();
  }



 

  geri(){
    this.navCtrl.setRoot("CartPage");
  }
  
  soruisareti() {
    let alert = this.alertCtrl.create({
      title: 'Güvenliğin Bizim İçin Önemli',
      subTitle: 'Starbucks Card bakiye yükleyebildiğiniz ve para yerine kullanabildiğiniz bir kart olduğu için TCKN bilgileriniz ile bakiye güvenliğiniz koruma altındadır.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  
}
