import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UrunPage } from "./urun";
import { PipesModule } from "../../app/pipes.module";
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [UrunPage],
  imports: [
    IonicPageModule.forChild(UrunPage),
    IonicPageModule,
    PipesModule,
    Ionic2RatingModule
  ],
  exports: [UrunPage]
})
export class UrunPageModule {}
