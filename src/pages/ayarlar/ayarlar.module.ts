import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AyarlarPage } from "./ayarlar";
import { PipesModule } from "../../app/pipes.module";
import "firebase/storage";


@NgModule({
  declarations: [AyarlarPage],
  imports: [IonicPageModule.forChild(AyarlarPage), PipesModule],
  exports: [AyarlarPage]
})
export class AyarlarPageModule {}
