import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  Platform,
  AlertController,
  Events
} from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-kullanimkosullari",
  templateUrl: "kullanimkosullari.html",
})
export class KullanımKosullarıPage {

  constructor(
    public navCtrl: NavController,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events
  ) {
    
  }
  geri(){
    this.navCtrl.setRoot("AyarlarPage");
  }
  
}
