import { Component,ViewChild } from "@angular/core";
import { Nav,IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-yildizlar",
  templateUrl: "yildizlar.html"
})
export class YıldızlarPage {
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
}
