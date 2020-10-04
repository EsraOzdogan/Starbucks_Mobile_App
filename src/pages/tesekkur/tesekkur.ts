import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-tesekkur",
  templateUrl: "tesekkur.html"
})
export class TesekkurPage {
  constructor(public navCtrl: NavController) {
    localStorage.removeItem("Cart");
  }

  home() {
    this.navCtrl.push("HesabımPage");
  }
}
