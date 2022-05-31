// CORE:
import { NgModule } from "@angular/core";
// EXTERNAL:
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// INTERNAL:
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { SharedModule } from "../auth/shared/shared.module";
import { TrainingRouting } from "./training.routing";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    provideFirestore(() => getFirestore()),
    SharedModule,
    TrainingRouting
  ],
  providers: [],
  entryComponents: [ StopTrainingComponent ]
})
export class TrainingModule {}
