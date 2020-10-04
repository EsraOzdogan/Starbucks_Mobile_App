import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-magazalar",
  templateUrl: "magazalar.html"
})
export class MagazalarPage {
  title: string = "My location ";
  lat: number = 12.918844;
  lng: number = 77.610877;
  zoom: number = 12;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  
}
