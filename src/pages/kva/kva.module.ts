import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { KVAPage } from "./kva";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [KVAPage],
  imports: [IonicPageModule.forChild(KVAPage), PipesModule],
  exports: [KVAPage]
})
export class KVAPageModule {}
