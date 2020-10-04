import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";

import { AngularFireDatabase } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-kredikartlarim",
  templateUrl: "kredikartlarim.html"
})
export class KrediKartlarımPage {
  public kredikartlari: Array<{}>;
  private uid: string;
  private username: string;

  constructor(
    public navCtrl: NavController,
    private dbService: AngularFireDatabase,
    private toastCtrl: ToastController
  ) {
    this.uid = localStorage.getItem("uid");
    this.dbService
      .object("users/" + this.uid)
      .valueChanges()
      .subscribe((user: any) => {
        console.log(user);
        if (user != null) {
          this.username = user.name;
        }

      });
    dbService
      .list("starbuckscartolustur")
      .valueChanges()
      .subscribe(
        res => {
          this.kredikartlari = [];
          res.forEach((item: any) => {
            if (item.userID == this.uid) {
              item["username"] = this.username;
              this.kredikartlari.push(item);
            }
          });
        },
        error => {
          this.presentToast(error.message);
        }
      );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
