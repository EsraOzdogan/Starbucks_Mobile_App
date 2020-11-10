import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

import { OneSignal } from "@ionic-native/onesignal";
import { SocialSharing } from "@ionic-native/social-sharing";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: "app.html",
  selector: "MyApp",
  providers: [StatusBar, SplashScreen, OneSignal, SocialSharing]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  name: any;
  imageUrl: any = "assets/img/user-img.jpg";
 // imageUrl1: any = "assets/img/onthego.png";
  rootPage: string = "HesabımPage";
  public uid: string;
  noOfItemsInNews: any;


  constructor(
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public platform: Platform,
    public statusbar: StatusBar,
    public splashscreen: SplashScreen,
    public socialSharing: SocialSharing,
    private oneSignal: OneSignal,
    private events: Events,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  

  private useTranslateService() {
    let value = localStorage.getItem("language");
    let language = value != null ? value : "en";
    language == "ar"
      ? this.platform.setDir("rtl", true)
      : this.platform.setDir("ltr", true);
    this.translateService.use(language);
  }

  
  ngOnInit() {
    this.uid = localStorage.getItem("uid");
    if (this.uid != null) {
      this.db
        .object("/users/" + this.uid)
        .valueChanges()
        .subscribe((res: any) => {
          if (res != null) {
            this.name = res.name;
            this.imageUrl =
              res.image != "" && res.image != null
                ? res.image
                : "assets/img/profile.jpg";
          } else {
            this.name = 'USER'
            this.imageUrl = 'assets/img/profile.jpg';
          }

        });
    }
    this.listenEvents();
    this.useTranslateService();
    this.getNewsCount();
  }

  private listenEvents() {
    this.events.subscribe("imageUrl", response => {
      this.imageUrl =
        response.image != "" && response.image != null
          ? response.image
          : "assets/img/profile.jpg";
      this.name = response.name;
    });
  }


  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initializeApp() {
    this.db.object('/settings/currency').valueChanges().subscribe(res => {
      localStorage.setItem('currency', JSON.stringify(res));
    }, err => {
      localStorage.setItem('currency', JSON.stringify({ currencyName: 'USD', currencySymbol: '$' }));
    });
    if (this.platform.ready()) {
      this.platform.ready().then(res => {
        if (res == "cordova") {
          this.oneSignal.startInit(
            "9740a50f-587f-4853-821f-58252d998399",
            "714618018341"
          );
          this.oneSignal.getIds().then(response => {
            if (this.uid != null) {
              this.uid = localStorage.getItem("uid");
              localStorage.setItem('playerId', response.userId);
              this.db.object("/users/" + this.uid).update({
                playerId: response.userId
              });
            }
          });
          this.oneSignal.inFocusDisplaying(
            this.oneSignal.OSInFocusDisplayOption.InAppAlert
          );
          this.oneSignal.handleNotificationReceived().subscribe(() => { });
          this.oneSignal.handleNotificationOpened().subscribe(() => { });
          this.oneSignal.endInit();
        }
      });
    }
  }

  private getNewsCount() {
    this.db
      .list("/mesajlar")
      .valueChanges()
      .subscribe(res => {
        this.noOfItemsInNews = res.length;
      });
  }

  ayarlar() {
    this.nav.setRoot("AyarlarPage");
  }

  hesabim() {
    this.nav.setRoot("HesabımPage");
  }

  card() {
    this.nav.push("CartPage");
  }
  yildizlar(){
    this.nav.push("YıldızlarPage")
  }

  magazalar() {
    this.nav.push("MagazalarPage");
  }

  mesajlar() {
    this.nav.push("MesajlarPage");
  }

  urunler() {
    this.nav.push("UrunlerPage");
  }

  giris() {
    this.nav.setRoot("GirisyapPage");
  }

  cikis() {
    this.af.auth.signOut();
    localStorage.removeItem("uid");
    localStorage.removeItem('playerId');
    this.imageUrl = "assets/img/profile.jpg";
    this.nav.setRoot("HesabımPage");
  }

  isLoggedin() {
    return localStorage.getItem("uid") != null;
  }

  hesapveayarlar(){
    this.nav.setRoot("HesapveAyarlarPage");
  }
}
