// CORE:
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// EXTERNAL:
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
// INTERNAL:
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.sass']
})
export class PastTrainingsComponent implements
  OnInit, AfterViewInit, OnDestroy {

  displayedColumns = [ "date", "name", "duration", "calories", "state" ];
  dataSource = new MatTableDataSource<Exercise>();
  private exercisesChangedSubs: Subscription;

  constructor(
    private trainingService: TrainingService
  ) {}

  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( MatPaginator ) paginator: MatPaginator;

  ngOnInit() {
    this.exercisesChangedSubs =
      this.trainingService.finishedExercisesChanged.subscribe(
        ( exercises: Exercise[] ) => {
          this.dataSource.data = exercises
        }
      );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.exercisesChangedSubs.unsubscribe();
  }

}
