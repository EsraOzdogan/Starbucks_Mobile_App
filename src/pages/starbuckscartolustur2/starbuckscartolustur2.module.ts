import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StarbucksCartOlustur2Page } from "./starbuckscartolustur2";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [StarbucksCartOlustur2Page],
  imports: [IonicPageModule.forChild(StarbucksCartOlustur2Page), PipesModule],
  exports: [StarbucksCartOlustur2Page]
})
export class StarbucksCartOlustur2PageModule {}
