import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FavoriPage } from "./favori";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [FavoriPage],
  imports: [IonicPageModule.forChild(FavoriPage), PipesModule],
  exports: [FavoriPage]
})
export class FavoriPageModule {}
