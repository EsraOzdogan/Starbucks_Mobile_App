import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AdresListesiPage } from "./adreslistesi";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [AdresListesiPage],
  imports: [IonicPageModule.forChild(AdresListesiPage), PipesModule],
  exports: [AdresListesiPage]
})
export class AdresListesiPageModule {}
