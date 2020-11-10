import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-mesajlar",
  templateUrl: "mesajlar.html"
})
export class MesajlarPage {
  newsData: any[] = [];

  constructor(
    public af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    af
      .list("/mesajlar")
      .snapshotChanges()
      .subscribe(res => {
        this.newsData = [];
        res.forEach(item => {
          let temp = item.payload.val();
          temp["$key"] = item.payload.key;
          this.newsData.push(temp);
        });
      });
  }

  mesajDetay(key) {
    this.navCtrl.push("MesajlarDetayPage", {
      id: key
    });
  }

  isNews(): boolean {
    return this.newsData.length == 0 ? false : true;
  }
}
