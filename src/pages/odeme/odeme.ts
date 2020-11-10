import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/database";
 /*import {
   PayPal,
   PayPalPayment,
   PayPalConfiguration
 } from "@ionic-native/paypal";*/
import { Stripe } from "@ionic-native/stripe";
import { CheckoutService } from "./odeme.service";
import {
  Braintree,
  // ApplePayOptions,
  PaymentUIOptions
} from "@ionic-native/braintree";


const payPalEnvironmentSandbox = "AcgkbqWGamMa09V5xrhVC8bNP0ec9c37DEcT0rXuh7hqaZ6EyHdGyY4FCwQC-fII-s5p8FL0RL8rWPRB";
const publishableKey = "pk_test_mhy46cSOzzKYuB2MuTWuUb34";
const stripe_secret_key = "sk_test_GsisHcPqciYyG8arVfVe2amE";

 const merchantId = "5ygrm337bv7crx6v";
 const public_key = "6jxkskrq8365x9jd";
 const private_key = "3532bdc23c9289ee9efee42613eaad47";
const braintree_token = "sandbox_3tt6pwn3_bbn2tzfk3zbq2jqr";
// const braintree_token = "sandbox$4gv8zndgpdy6gnvt$e3c0c77402cbf5ba88bc4c76f1f85dc9";

@IonicPage()
@Component({
  selector: "page-odeme",
  templateUrl: "odeme.html",
  providers: [Stripe, Braintree, CheckoutService] //, PayPal, 
})
export class OdemePage {
  date: any;
  orderId: any;
  order: any = {};
  userId: any;
  userDetails: any = {
    name: "",
    userid: ""
  };
  checkout: AngularFireList<any>;
  userDetail: AngularFireObject<any>;
  bookings: AngularFireObject<any>;
  color: any;
  str: any;
  paymentType: string;
  paymentDetails: any = {
    paymentStatus: true
  };
  stripe_card: any = {};

  public paymentTypes: any = [
    {
      default: false,
      type: "Starbuck Card",
      value: "Stripe",
      logo: "assets/img/starbuckscard.jpg"
    },
    { default: false, type: "ÖDE", value: "COD", logo: "" }
  ];

  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
  //   public payPal: PayPal,
    public stripe: Stripe,
    private braintree: Braintree,
    private checkoutService: CheckoutService,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.order = this.navParams.get("orderDetails");
    this.str = "#";
    var num = Math.floor(Math.random() * 900000) + 100000;
    this.color = this.str.concat(num);
    this.checkout = db.list("/orders");
  }

  ionViewDidLoad() {
    this.paymentType = "Braintree";
    if (this.af.auth.currentUser) {
      this.userId = this.af.auth.currentUser.uid;
      this.userDetail = this.db.object("/users/" + this.userId);
      this.userDetail.valueChanges().subscribe((res: any) => {
        res.mobileNo
          ? (this.userDetails = {
            email: res.email,
            name: res.name,
            mobileNo: res.mobileNo,
            userid: this.userId
          })
          : (this.userDetails = {
            email: res.email,
            name: res.name,
            userid: this.userId
          });
      });
    }
  }

  choosePaymentType(paymentType) {
    this.paymentType = paymentType;
    this.order.paymentType = paymentType;
    this.paymentDetails.paymentType = paymentType;
  }

  /* paywithBraintree() {
    const paymentOptions: PaymentUIOptions = {
      amount: "14.99",
     primaryDescription: "brain tree payment"
    };

    this.braintree
      .initialize(braintree_token)
      // .then(() => this.braintree.setupApplePay(appleOptions))
      .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
      .then((result: any) => {
         if (result.userCancelled) {
          console.log("User cancelled payment dialog.");
       } else {
          console.log("User successfully completed payment!");
          console.log("Payment Nonce: " + JSON.stringify(result.nonce));
          console.log("Payment Result.", JSON.stringify(result));
         }
       })
       .catch((error: string) => console.log("Error- " + JSON.stringify(error)));
   }*/

  ode(form: NgForm) {
    this.order.orderId = Math.floor(Math.random() * 90000) + 10000;
    this.order.userDetails = this.userDetails;
    this.order.userId = this.userId;
    this.order.createdAt = Date.now();
    this.order.status = "pending";
    this.order.paymentStatus = "pending";
    delete this.order.shippingAddress.$key;
    this.order.statusReading = [
      {
        title: "Siparişiniz kabul edildi, burada durum size bildirilecek.",
        time: Date.now()
      }
    ];
    if (this.paymentType == "Braintree") {
       const config = {
         PayPalEnvironmentProduction: "",
         PayPalEnvironmentSandbox: payPalEnvironmentSandbox
       };
      this.checkout.push(this.order).then(res => {
        const paymentOptions: PaymentUIOptions = {
          amount: this.order.grandTotal,
          primaryDescription: "brain tree ödeme"
        };
        this.braintree.initialize(braintree_token)
          .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
          .then((result: any) => {
            if (result.userCancelled) {
              console.log("Kullanıcı ödemeyi iptal etti iletişim kutusu.");
            } else {
              this.paymentDetails.transactionId = result.clientMetadataId;
              this.saveLoyaltyData(res.key);
              this.db.object("/orders/" + res.key).update({
                paymentDetails: this.paymentDetails,
                paymentStatus: "success"
              }).then(() => {
                this.navCtrl.setRoot("TesekkurlerPage");
              });
            }
          }).catch((error: any) => {
            if (error.message) {
              this.showAlert(error.message);
            }
          });
      });
    }else {
      this.checkout.push(this.orderId).then(res => {



         console.log("sipariş verildi! " + JSON.stringify(res));
        this.saveLoyaltyData(res.key);
        this.navCtrl.setRoot("TesekkurlerPage");
      });
    }
  }

  saveLoyaltyData(orderId) {
    if (this.order.appliedLoyaltyPoints == true) {
      let loayltyObj: any = {
        credit: false,
        points: -Number(this.order.usedLoyaltyPoints),
        orderId: orderId,
        createdAt: Date.now()
      };
      this.db.list("users/" + this.userId + "/loyaltyPoints").push(loayltyObj);
      this.db.list("/orders/" + orderId + "/loyaltyPoints")
        .push(loayltyObj).then(result => {
          // console.log("loyaltyUpdated-" + result);
        });
    } else {
      console.log("loyality uygulanmadı!!");
    }
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

}
