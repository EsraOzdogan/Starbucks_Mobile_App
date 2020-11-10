import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UrunDetayPage } from "./urundetay";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [UrunDetayPage],
  imports: [IonicPageModule.forChild(UrunDetayPage), PipesModule],
  exports: [UrunDetayPage]
})
export class UrunDetayPageModule {}
