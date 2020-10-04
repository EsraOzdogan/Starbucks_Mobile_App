import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StarbucksCartOlusturPage } from "./starbuckscartolustur";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [StarbucksCartOlusturPage],
  imports: [IonicPageModule.forChild(StarbucksCartOlusturPage), PipesModule],
  exports: [StarbucksCartOlusturPage]
})
export class StarbucksCartOlusturPageModule {}
