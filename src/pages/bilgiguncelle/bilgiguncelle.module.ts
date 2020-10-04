import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { BilgiGüncellePage } from "./bilgiguncelle";
import { PipesModule } from "../../app/pipes.module";
import "firebase/storage";

@NgModule({
  declarations: [BilgiGüncellePage],
  imports: [IonicPageModule.forChild(BilgiGüncellePage), PipesModule],
  exports: [BilgiGüncellePage]
})
export class BilgiGüncellePageModule {}
