// core:
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// external:
import { Subscription } from 'rxjs';
// internal:
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService
  ) {}

  exercises: Exercise[];
  exerciseSubs: Subscription;

  ngOnInit() {
    this.exerciseSubs = this.trainingService.exercisesChanged.subscribe(
      exercises => { this.exercises = exercises }
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubs.unsubscribe()
  }

}
