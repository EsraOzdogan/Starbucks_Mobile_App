import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AdresListePage } from "./adresliste";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [AdresListePage],
  imports: [IonicPageModule.forChild(AdresListePage), PipesModule],
  exports: [AdresListePage]
})
export class AdresListePageModule {}
