import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StarbucksCartNedirPage } from "./starbuckscartnedir";
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [StarbucksCartNedirPage],
  imports: [IonicPageModule.forChild(StarbucksCartNedirPage), PipesModule],
  exports: [StarbucksCartNedirPage]
})
export class StarbucksCartNedirPageModule {}
