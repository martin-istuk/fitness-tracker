// core:
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// external:
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// internal:
import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService
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
    this.fireAuth
      .createUserWithEmailAndPassword( authData.email, authData.password )
      .then( result => { console.log(result) } )
      .catch( error => { console.log(error) } );
  }

  login( authData: AuthData ) {
    this.fireAuth
      .signInWithEmailAndPassword( authData.email, authData.password )
      .then( result => { console.log(result) } )
      .catch( error => { console.log(error) } );
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
