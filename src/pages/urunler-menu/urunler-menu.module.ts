import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UrunlerMenuPage } from "./urunler-menu";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [UrunlerMenuPage],
  imports: [IonicPageModule.forChild(UrunlerMenuPage), PipesModule],
  exports: [UrunlerMenuPage]
})
export class UrunlerMenuPageModule {}
