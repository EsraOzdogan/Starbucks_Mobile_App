import { PipesModule } from '../../app/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParolamıUnuttumPage } from './parolamiunuttum';

@NgModule({
  declarations: [
    ParolamıUnuttumPage,
  ],
  imports: [
    IonicPageModule.forChild(ParolamıUnuttumPage),
    PipesModule
  ],
})
export class ParolamıUnuttumPageModule { }
