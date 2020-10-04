import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StarbucksCartOlusturulduPage } from "./starbuckscartolusturuldu";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [StarbucksCartOlusturulduPage],
  imports: [IonicPageModule.forChild(StarbucksCartOlusturulduPage), PipesModule],
  exports: [StarbucksCartOlusturulduPage]
})
export class StarbucksCartOlusturulduPageModule {}
