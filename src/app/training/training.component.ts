// core:
import { Component, OnInit } from '@angular/core';

// external:
import { Subscription } from 'rxjs';

// internal:
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.sass']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSub: Subscription;

  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if( exercise) {
          this.ongoingTraining = true
        } else {
          this.ongoingTraining = false
        }
      }
    )
  }

}
