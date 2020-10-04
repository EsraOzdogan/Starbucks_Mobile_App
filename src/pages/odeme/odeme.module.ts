import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { OdemePage } from "./odeme";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [OdemePage],
  imports: [IonicPageModule.forChild(OdemePage), PipesModule],
  exports: [OdemePage]
})
export class OdemePageModule { }
