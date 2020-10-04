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

  public SliderurunData: Array<any> = [];
  public Urunler: Array<any> = [];
  sliderurunData: AngularFireList<any>;
  urunler: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public platform: Platform,
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.sliderurunData = af.list("/sliderurun");
      this.urunler = af.list("/urunler");
      this.sliderurunData.valueChanges().subscribe(data => {
        this.SliderurunData = data;
      });
      this.urunler.snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          this.Urunler = res;
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
    this.navCtrl.push("UrunlerListPage", { id: id });
  }
  
  kategori(){
    this.navCtrl.setRoot("UrunlerMenuPage");
  }
  detay(id) {
    console.log(id)
    this.navCtrl.push("ÜrünDetayPage", { id: id });  }
  navcart() {
    this.navCtrl.push("CartPage");
  }
}
