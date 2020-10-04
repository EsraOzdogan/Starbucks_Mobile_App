import { Component,ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  Platform,
  AlertController,
  ToastController,
  Nav,
  Events
} from "ionic-angular";
import { CustomValidators } from "ng2-validation";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
//import * as firebase from "firebase";
import { TranslateService } from "@ngx-translate/core";
import * as firebase from "firebase/app";
import { CallNumber } from "@ionic-native/call-number";



@IonicPage()
@Component({
  selector: "page-ayarlar",
  templateUrl: "ayarlar.html",
  providers: [CallNumber]
})
export class AyarlarPage {
  @ViewChild(Nav) nav: Nav;
  contactNo: any = 2164540909;
  tagHide: boolean = true;
  valForm: FormGroup;
  value: any;
  imageUrl: any = "assets/img/user-img.jpg";

  user: any = {};
  url: any = "assets/img/profile.jpg";
  options = [
    {
      language: "TÜRKÇE",
      value: "tr"
    },
    {
      language: "İNGİLİZCE",
      value: "en"
    }
  ];




  public file: any = {};
  public storageRef = firebase.storage();


  constructor(
    public toastCtrl: ToastController,
    public callNumber: CallNumber,
    public navCtrl: NavController,
    public fb: FormBuilder,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events,
    public translate: TranslateService
  ) {
    this.valForm = fb.group({
      email: [
        "esraozdogan@gmail.com",
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: ["123456", Validators.required]
    });
    {
      let value = localStorage.getItem("language");
      this.value = value != null ? value : "tr";
      this.translate.setDefaultLang("tr");
    }
  }
  ngOnInit() {
    if (this.af.auth.currentUser) {
      this.db
        .object("/users/" + this.af.auth.currentUser.uid)
        .valueChanges()
        .subscribe((res: any) => {
          this.user = res;
          this.user.image = res.image ? res.image : "";
          this.url = res.image ? res.image : "assets/img/profile.jpg";
        });
    }
  }

  readUrl(event) {
    this.file = (<HTMLInputElement>document.getElementById("file")).files[0];
    let metadata = {
      contentType: "image/*"
    };
    let loader = this.loadingCtrl.create({
      content: "please wait.."
    });
    loader.present();
    this.storageRef
      .ref()
      .child("profile/" + this.file.name)
      .put(this.file, metadata)
      .then(res => {
        this.user.image = res.downloadURL;
        this.url = res.downloadURL;
        this.db
          .object("users" + "/" + this.af.auth.currentUser.uid + "/image")
          .set(res.downloadURL);
        loader.dismiss();
      })
      .catch(error => {
        loader.dismiss();
      });
  }

  changeLanguage() {
    localStorage.setItem("language", this.value);
    if (this.value == "en") {
      this.platform.setDir("ltr", true);
      this.translate.use("en");
    } else {
      this.platform.setDir("ltr", true);
      this.translate.use("tr");
    }
  }
 




  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }


  toggleRegister() {
    this.tagHide = this.tagHide ? false : true;
  }

  OnLogin($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.af.auth.signInWithEmailAndPassword(value.email, value.password).then((success: any) => {
        localStorage.setItem("uid", success.uid);
        this.publishEvent();
        this.navCtrl.setRoot("HesabımPage");
      }).catch(error => {
        this.showAlert(error.message);
      });
    }
  }

  private publishEvent() {
    this.db.object("/users/" + this.af.auth.currentUser.uid).valueChanges().subscribe((userInfo: any) => {
      this.events.publish("imageUrl", userInfo);
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }
  telefon() {
    this.callNumber
      .callNumber(this.contactNo, true)
      .then(() => {})
      .catch(() => {});
  }

  uyeol(){
    this.navCtrl.setRoot("UyeolPage");
  }
  girisyap(){
    this.navCtrl.setRoot("GirisyapPage");
  }
  yardim(){
    this.navCtrl.setRoot("YardımPage");
  }
  kullanimkosullari(){
    this.navCtrl.setRoot("KullanımKosullarıPage");
  }
  kva(){
    this.navCtrl.setRoot("KVAPage");
  }
 geri(){
  this.navCtrl.setRoot("HesabımPage");
}

isLoggedin() {
  return localStorage.getItem("uid") != null;
}

bilgiguncelle(){
  this.navCtrl.setRoot("BilgiGüncellePage");
}
favori(){
  this.navCtrl.setRoot("FavoriPage");
}
kredikartlarim(){
  this.navCtrl.setRoot("KrediKartlarımPage");
}



cikis() {
  this.af.auth.signOut();
  localStorage.removeItem("uid");
  localStorage.removeItem('playerId');
  this.imageUrl = "assets/img/profile.jpg";
  this.nav.setRoot("HesabımPage");
}

  
}
