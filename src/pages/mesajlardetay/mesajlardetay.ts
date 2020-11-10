import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-mesajlardetay",
  templateUrl: "mesajlardetay.html"
})
export class MesajlarDetayPage {
  id: any;
  newsDetails: any = {};

  constructor(
    public af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.id = this.navParams.get("id");
    af
      .object("/mesajlar/" + this.id)
      .valueChanges()
      .subscribe((res: any) => {
        this.newsDetails = res;
      });
  }
}
