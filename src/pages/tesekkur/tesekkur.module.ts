import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TesekkurPage } from "./tesekkur";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [TesekkurPage],
  imports: [IonicPageModule.forChild(TesekkurPage), PipesModule],
  exports: [TesekkurPage]
})
export class TesekkurPageModule {}
