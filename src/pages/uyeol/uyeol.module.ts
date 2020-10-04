import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UyeolPage } from "./uyeol";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [UyeolPage],
  imports: [IonicPageModule.forChild(UyeolPage), PipesModule],
  exports: [UyeolPage]
})
export class UyeolPageModule {}
