import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { YıldızlarPage } from "./yildizlar";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [YıldızlarPage],
  imports: [IonicPageModule.forChild(YıldızlarPage), PipesModule],
  exports: [YıldızlarPage]
})
export class HesabımPageModule {}
