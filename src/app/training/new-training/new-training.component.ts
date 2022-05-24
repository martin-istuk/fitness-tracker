// core:
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// internal:
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit {
  constructor(
    private trainingService: TrainingService
  ) {}

  exercises: Exercise[] = [];

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
