import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MesajlarPage } from "./mesajlar";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [MesajlarPage],
  imports: [IonicPageModule.forChild(MesajlarPage), PipesModule],
  exports: [MesajlarPage]
})
export class MesajlarPageModule {}
