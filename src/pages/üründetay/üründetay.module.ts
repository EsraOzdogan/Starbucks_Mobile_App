import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ÜrünDetayPage } from "./üründetay";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [ÜrünDetayPage],
  imports: [IonicPageModule.forChild(ÜrünDetayPage), PipesModule],
  exports: [ÜrünDetayPage]
})
export class ÜrünDetayPageModule {}
