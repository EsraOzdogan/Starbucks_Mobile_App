import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-starbuckscartolusturuldu",
  templateUrl: "starbuckscartolusturuldu.html"
})
export class StarbucksCartOlusturulduPage {
  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {
  }
  
  tamam(){
    this.navCtrl.push("HesabımPage");
  }
}
