
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimulPage } from './simul';
import { BrMaskerModule} from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SimulPage,
  ],
  imports: [
    IonicPageModule.forChild(SimulPage),
    BrMaskerModule,
  ],
})
export class SimulPageModule {}
