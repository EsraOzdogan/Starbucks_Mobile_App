import { Component,ViewChild } from "@angular/core";
import { Nav,IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-starbuckscartolustur",
  templateUrl: "starbuckscartolustur.html"
})
export class StarbucksCartOlusturPage {
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

  geri(){
  this.navCtrl.setRoot("CartPage");
}
devamet(){
  this.navCtrl.setRoot("StarbucksCartOlustur2Page");
  
}
isLoggedin() {
  return localStorage.getItem("uid") != null;
}
}
