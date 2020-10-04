import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { KullanımKosullarıPage } from "./kullanimkosullari";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [KullanımKosullarıPage],
  imports: [IonicPageModule.forChild(KullanımKosullarıPage), PipesModule],
  exports: [KullanımKosullarıPage]
})
export class KullanımKosullarıPageModule {}
