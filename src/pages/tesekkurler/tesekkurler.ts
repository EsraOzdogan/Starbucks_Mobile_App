import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-tesekkurler",
  templateUrl: "tesekkurler.html"
})
export class TesekkurlerPage {
  constructor(public navCtrl: NavController) {
    localStorage.removeItem("Cart");
  }

  home() {
    this.navCtrl.push("HesabımPage");
  }
}
