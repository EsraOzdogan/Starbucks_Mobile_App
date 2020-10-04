import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HesabımPage } from "./hesabim";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [HesabımPage],
  imports: [IonicPageModule.forChild(HesabımPage), PipesModule],
  exports: [HesabımPage]
})
export class HesabımPageModule {}
