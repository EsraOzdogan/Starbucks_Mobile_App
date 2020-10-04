import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { YardımPage } from "./yardim";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [YardımPage],
  imports: [IonicPageModule.forChild(YardımPage), PipesModule],
  exports: [YardımPage]
})
export class YardımPageModule {}
