import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  Platform,
  AlertController,
  Events
} from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-uyeol",
  templateUrl: "uyeol.html",
})
export class UyeolPage implements OnInit {
  registration: FormGroup;
  userDetails: AngularFireObject<any>;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public fb: FormBuilder,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform
  ) { }

  onSubmit() {
    this.af.auth.createUserWithEmailAndPassword(this.registration.value.email, this.registration.value.password)
      .then((success: any) => {
        this.db.object("/users/" + success.uid).update({
          name: this.registration.value.name,
          email: this.registration.value.email,
          role: "User"
        });
        localStorage.setItem("uid", success.uid);
        this.navCtrl.setRoot("HesabımPage");
      }).catch(error => {
        console.log("Firebase failure: " + JSON.stringify(error));
        this.showAlert(error.message);
      });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

  navLogin() {
    this.navCtrl.setRoot("GirisyapPage");
  }

  ngOnInit(): any {
    this.buildForm();
  }

  //Validation
  buildForm(): void {
    this.registration = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ])
    });
  }

}
