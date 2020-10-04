import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AdresEklePage } from "./adresekle";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [AdresEklePage],
  imports: [IonicPageModule.forChild(AdresEklePage), PipesModule],
  exports: [AdresEklePage]
})
export class AdresEkleModule {}
