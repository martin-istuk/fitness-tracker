// core:
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// external:
import { Subscription } from 'rxjs';
// internal:
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/auth/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService,
    private UIService: UIService
  ) {}

  exercises: Exercise[];
  private exerciseSubs: Subscription;
  private loadingSubs: Subscription;
  loadingState: boolean = true;

  ngOnInit() {
    this.loadingSubs = this.UIService.loadingStateChanged.subscribe(
      isLoading => {
        this.loadingState = isLoading
      }
    );
    this.exerciseSubs = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubs) {
      this.exerciseSubs.unsubscribe()
    }
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe()
    }
  }

}
