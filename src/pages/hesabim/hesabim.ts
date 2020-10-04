import { Component,ViewChild } from "@angular/core";
import { Nav,IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-hesabim",
  templateUrl: "hesabim.html"
})
export class HesabımPage {
  @ViewChild(Nav) nav: Nav;
  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 2000,
    pager: false
  };

  public uid: string;
  Cart: any = [];
  noOfItems: any;
 // uid;

  public ComingData: Array<any> = [];
  public Categories: Array<any> = [];
  comingData: AngularFireList<any>;
  categories: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
}


  
  Uyeol(){
  this.navCtrl.push("UyeolPage");
}
Girisyap(){
  this.navCtrl.push("GirisyapPage");
}
isLoggedin() {
  return localStorage.getItem("uid") != null;
}

cart(){
  this.navCtrl.push("CartPage");
}
yildizlar(){
  this.navCtrl.push("YıldızlarPage");
}
mesajlar(){
  this.navCtrl.push("MesajlarPage");
}
}
