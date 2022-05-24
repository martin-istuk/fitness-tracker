// core:
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// external:
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// internal:
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.sass']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = [ "date", "name", "duration", "calories", "state" ];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(
    private trainingService: TrainingService
  ) {}

  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( MatPaginator ) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.data =
      this.trainingService.getCompletedOrCancelledExercises();
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

}
