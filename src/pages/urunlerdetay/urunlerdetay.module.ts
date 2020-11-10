import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UrunlerDetayPage } from "./urunlerdetay";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [UrunlerDetayPage],
  imports: [IonicPageModule.forChild(UrunlerDetayPage), PipesModule],
  exports: [UrunlerDetayPage]
})
export class UrunlerDetayPageModule {}
