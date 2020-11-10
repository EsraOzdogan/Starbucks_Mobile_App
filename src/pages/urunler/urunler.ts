import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { Nav, Platform } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Slides } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-urunler",
  templateUrl: "urunler.html"
})
export class UrunlerPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Nav) nav: Nav;
  Cart: any = [];
  noOfItems: any;
  uid;


  SliderurunData: any[] = [];

  /*public SliderurunData: Array<any> = [];
  sliderurunData: AngularFireList<any>;*/

  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public platform: Platform,
  ) {
    let loader = this.loadingCtrl.create({
      content: "Lütfen bekleyin..."
    });
   /* loader.present().then(() => {
      this.sliderurunData = af.list("/sliderurun");
      this.sliderurunData.valueChanges().subscribe(data => {
        this.SliderurunData = data;
      });
      this.sliderurunData.snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          this.SliderurunData = res;
        })
      loader.dismiss();
      // .subscribe(data => {
      //   this.Categories = [];
      //   loader.dismiss();
      //   data.forEach(item => {
      //     let temp = item.payload.toJSON();
      //     temp["$key"] = item.payload.key;
      //     this.Categories.push(temp);
      //   });
      // });

    });*/
    af
      .list("/sliderurun")
      .snapshotChanges()
      .subscribe(res => {
        this.SliderurunData = [];
        res.forEach(item => {
          let temp = item.payload.val();
          temp["$key"] = item.payload.key;
          this.SliderurunData.push(temp);
        });
      });
  }


  detay(key) {
    this.navCtrl.push("UrunlerDetayPage", {
      id: key
    });
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;
  }

  /*navigate(id) {
    this.navCtrl.push("ProductListPage", { id: id });
  }*/

  navigate(id) {
    console.log(id)
    this.navCtrl.push("UrunPage", { id: id });
  }
  
  kategori(){
    this.navCtrl.setRoot("UrunlerMenuPage");
  }
 /* detay(id) {
    console.log(id)
    this.navCtrl.push("ProductDetailsPage", { id: id });  }*/
  navcart() {
    this.navCtrl.push("CartPage");
  }
}
