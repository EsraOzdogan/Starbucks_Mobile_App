import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  AngularFireDatabase,
  AngularFireList
} from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

// declare let google: any;

@IonicPage()
@Component({
  selector: "page-adresliste",
  templateUrl: "adresliste.html"
})
export class AdresListePage {
  grandTotal: any;
  subTotal: any;
  address: any = {};
  addressList: any = [];
  payTotal: any;
  couponDiscount: any;
  deductedPrice: any;
  cart: Array<any>;
  orderDetails: any = {};
  public loyaltyPercentage: number = 0;
  public loyaltyPoints: number = 0;
  public leftLoyaltyPoint: number = 0;
  public checked: boolean = false;
  public userRef: AngularFireList<any>;
  public loyaltyArray: any[] = [];
  public loyaltyLimit: number;
  public currency: {};

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.currency = JSON.parse(localStorage.getItem('currency'));
    this.orderDetails.grandTotal = this.navParams.get("grandTotal");
    this.payTotal = this.orderDetails.grandTotal;
    this.orderDetails.couponDiscount = this.navParams.get("couponDiscount");
    this.orderDetails.subTotal = this.navParams.get("subTotal");
    this.orderDetails.deductedPrice = this.navParams.get("deductedPrice");
    this.orderDetails.tax = this.navParams.get("totalVat");
    if (this.orderDetails.grandTotal == undefined) {
      this.navCtrl.push("CartPage");
    }
    if (this.af.auth.currentUser) {
      this.db
        .list("/users/" + this.af.auth.currentUser.uid + "/address")
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          this.addressList = res;
        })

      // .subscribe(res => {
      //   this.addressList = [];
      //   res.forEach(item => {
      //     let temp = item.payload.toJSON();
      //     temp["$key"] = item.payload.key;
      //     this.addressList.push(temp);
      //   });
      // });

    
      this.db
        .object("loyalitys")
        .valueChanges()
        .subscribe(loyalty => {
          let res: any = loyalty;
          if (res.enable) {
            this.loyaltyPercentage = res.loylityPercentage;
            this.loyaltyLimit = res.minLoyalityPointes;
          }
        });

      this.userRef = this.db.list(
        "users/" + this.af.auth.currentUser.uid + "/loyaltyPoints"
      );
      this.userRef.valueChanges().subscribe(res => {
        let points: any = res;
        this.loyaltyArray = points;
        let _points: number = 0;
        for (let i = 0; i < this.loyaltyArray.length; i++) {
          _points = Number(
            Number(_points) + Number(this.loyaltyArray[i].points)
          );
          this.loyaltyPoints = _points;
        }
      });
    }
    this.orderDetails.cart = JSON.parse(localStorage.getItem("Cart"));
  }

  // Add Address
  addAddress() {
    this.navCtrl.push("AdresEklePage", {
      id: 0
    });
  }

  //Selected Address
  selectAddress(key, address) {
    this.orderDetails.shippingAddress = address;
  }

  checkOut() {
    this.orderDetails.usedLoyaltyPoints =
      this.checked == true ? this.loyaltyPoints : 0;
    this.orderDetails.appliedLoyaltyPoints = this.checked;
    this.orderDetails.orderView = false;
    if (this.orderDetails.shippingAddress) {
      this.navCtrl.push("OdemePage", {
        orderDetails: this.orderDetails
      });
    }  else {
      this.showAlert("Select Your Address First!");
    }
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Sorry!",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

  updateLoyality(event) {
    if (this.loyaltyPoints >= this.loyaltyLimit) {
      this.checked = event.value;
      if (event.value == true) {
        if (this.payTotal < this.loyaltyPoints) {
          this.orderDetails.grandTotal = 0;
          this.leftLoyaltyPoint = this.loyaltyPoints - this.payTotal;
        } else if (this.payTotal > this.loyaltyPoints) {
          this.orderDetails.grandTotal = this.payTotal - this.loyaltyPoints;
          this.leftLoyaltyPoint = 0;
        }
      } else {
        this.orderDetails.grandTotal = this.navParams.get("grandTotal");
      }
    }
  }
}
