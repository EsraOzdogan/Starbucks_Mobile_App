import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UrunlerPage } from "./urunler";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [UrunlerPage],
  imports: [IonicPageModule.forChild(UrunlerPage), PipesModule],
  exports: [UrunlerPage]
})
export class UrunlerPageModule {}
