import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TesekkurlerPage } from "./tesekkurler";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [TesekkurlerPage],
  imports: [IonicPageModule.forChild(TesekkurlerPage), PipesModule],
  exports: [TesekkurlerPage]
})
export class TesekkurlerPageModule {}
