// core:
import { Injectable } from "@angular/core";
// external:
import { map, Subject, Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
// internal:
import { Exercise } from "./exercise.model";
import { UIService } from "../auth/shared/ui.service";

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(
    private firestore: AngularFirestore,
    private UIService: UIService
  ) {}

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private firebaseSubs: Subscription[] = [];

  fetchAvailableExercises() {
    this.UIService.loadingStateChanged.next(true);
    this.firebaseSubs.push(this.firestore.collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map( docArray => {
          // throw(new Error())
          return docArray.map( doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data() ["name"],
              duration: doc.payload.doc.data() ["duration"],
              calories: doc.payload.doc.data() ["calories"]
            }
          } )
        } )
      )
      .subscribe(
        (exercises: Exercise[]) => {
          this.UIService.loadingStateChanged.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next( [...this.availableExercises] );
        }, error => {
          this.UIService.loadingStateChanged.next(false);
          this.UIService.showSnackbar(
            "Fetching exercises failed, please try again later.",
            null,
            5000
            );
          this.exercisesChanged.next(null);
        }
      )
    )
  }

  startExercise( selectedId: string ) {
    // this.firestore.doc("availableExercises/" + selectedId).update( { lastSelected: new Date() } );
    this.runningExercise = this.availableExercises.find(
      ex => ex.id == selectedId
    );
    this.exerciseChanged.next( { ...this.runningExercise } );
  }

  completeExercise() {
    this.addDataToFirestore( {
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    } );
    this.runningExercise = null;
    this.exerciseChanged.next( null );
  }

  cancelExercise( progress: number ) {
    this.addDataToFirestore( {
      ...this.runningExercise,
      duration: this.runningExercise.duration * ( progress / 100 ),
      calories: this.runningExercise.calories * ( progress / 100 ),
      date: new Date(),
      state: "cancelled"
    } );
    this.runningExercise = null;
    this.exerciseChanged.next( null );
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.firebaseSubs.push(this.firestore
      .collection("finishedExercises")
      .valueChanges()
      .subscribe(
        ( exercises: Exercise[] ) => {
          this.finishedExercisesChanged.next(exercises);
        }
      )
    )
  }

  cancelSubs() {
    this.firebaseSubs.forEach( sub => sub.unsubscribe());
  }

  private addDataToFirestore(exercise: Exercise) {
    this.firestore.collection("finishedExercises").add(exercise)
  }
}
