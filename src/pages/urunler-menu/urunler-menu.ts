import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-urunler-menu",
  templateUrl: "urunler-menu.html"
})
export class UrunlerMenuPage {
  noOfItems: any;
  public Yiyecekler: Array<any> = [];
  public Icecekler: Array<any> = [];
  public Kahveler: Array<any> = [];

  yiyecekler: AngularFireList<any>;
  icecekler: AngularFireList<any>;
  kahveler: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.yiyecekler = af.list("/yiyecekler");
      this.yiyecekler.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((res: any) => {
        this.Yiyecekler = res;
      })
      this.icecekler = af.list("/icecekler");
      this.icecekler.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((res: any) => {
        this.Icecekler = res;
      })
      this.kahveler = af.list("/kahveler");
      this.kahveler.snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          this.Kahveler = res;
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

  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;
  }

  navigate(id) {
    this.navCtrl.push("UrunPage", { id: id });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }
  geri(){
    this.navCtrl.setRoot("UrunlerPage");
  }
  


/*  
  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 2000,
    pager: false
  };
  Cart: any = [];
  noOfItems: any;
  uid;

  public Icecekler: Array<any> = [];
  public Yiyecekler: Array<any> = [];
  public Kahveler: Array<any> = [];

  icecekler: AngularFireList<any>;
  yiyecekler: AngularFireList<any>;
  kahveler: AngularFireList<any>;


  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.icecekler = af.list("/icecekler");
      this.yiyecekler = af.list("/yiyecekler");
      this.kahveler = af.list("/kahveler");

    
      this.yiyecekler.valueChanges().subscribe(data => {
        this.Yiyecekler = data;
      });
      this.kahveler.valueChanges().subscribe(data => {
        this.Kahveler = data;
      });
      this.icecekler.snapshotChanges()

        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((data: any) => {
          this.Icecekler = data;
          console.log(this.Icecekler);
          loader.dismiss();
        })
       
        

      // .subscribe(data => {
      //   this.Categories = [];
      //   data.forEach(item => {
      //     let temp = item.payload.toJSON();
      //     temp["$key"] = item.payload.key;
      //     this.Categories.push(temp);
      //   });
      //   loader.dismiss();
      // });
    });
  }

  ionViewWillEnter() {
    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = this.Cart != null ? this.Cart.length : null;
    this.uid = localStorage.getItem('uid');
    if (this.uid != null) {
      if (localStorage.getItem("playerId")) {
        this.af.object("/users/" + this.uid).update({
          playerId: localStorage.getItem("playerId")
        });
      }
    }
  }

 /* navigate(id) {
    console.log(id)
    this.navCtrl.push("", { id: id });
  }
  
  navigate(id) {
    this.navCtrl.push("ProductListPage", { id: id });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }*/
}
