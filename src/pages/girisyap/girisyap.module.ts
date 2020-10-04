import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GirisyapPage } from "./girisyap";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [GirisyapPage],
  imports: [IonicPageModule.forChild(GirisyapPage), PipesModule],
  exports: [GirisyapPage]
})
export class GirisyapPageModule {}
