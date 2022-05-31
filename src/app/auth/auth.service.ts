// core:
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// external:
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// internal:
import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import { UIService } from "./shared/ui.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private UIService: UIService
  ) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe( user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate( [ "/training" ] );
      } else {
        this.trainingService.cancelSubs();
        this.authChange.next(false);
        this.router.navigate( [ "/login" ] );
        this.isAuthenticated = false;
      }
    } );
  }

  registerUser( authData: AuthData ) {
    this.UIService.loadingStateChanged.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword( authData.email, authData.password )
      .then( ()=> {
        this.UIService.loadingStateChanged.next(false);
      } )
      .catch( error => {
        this.UIService.loadingStateChanged.next(false);
        this.UIService.showSnackbar(error.message, null, 5000);
      } )
    ;
  };


  login( authData: AuthData ) {
    this.UIService.loadingStateChanged.next(true);
    this.fireAuth
      .signInWithEmailAndPassword( authData.email, authData.password )
      .then( ()=> {
        this.UIService.loadingStateChanged.next(false);
      } )
      .catch( error => {
        this.UIService.loadingStateChanged.next(false);
        this.UIService.showSnackbar(error.message, null, 5000);
      } )
    ;
  };


  logout() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
