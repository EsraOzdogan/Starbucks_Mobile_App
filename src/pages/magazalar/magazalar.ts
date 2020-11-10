import { Component } from "@angular/core";
import { Button, IonicPage, NavController, NavParams } from "ionic-angular";

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
  public selectedItems: Array<any> = [];
  items: any = [];



  value: any;

  options = [
    {
      language: "Şuan Açık",
    },
    {
      language: "24 Saat Açık",
    },
    {
      language: "Reserve",
    },
    {
      language: "Otopark",
    }
  ];



  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  initializeItems() {
    this.items = this.selectedItems;

  }
  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.items = this.items.filter(data => {
        return data.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }


  filtrele() {
  
  }
}
