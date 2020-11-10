import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MesajlarDetayPage } from "./mesajlardetay";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [MesajlarDetayPage],
  imports: [IonicPageModule.forChild(MesajlarDetayPage), PipesModule],
  exports: [MesajlarDetayPage]
})
export class MesajlarDetayPageModule {}
