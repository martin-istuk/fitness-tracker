// core:
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// external:
import { Subject } from "rxjs";

// internal:
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router
  ) {}

  authSuccess() {
    this.authChange.next(true);
    this.router.navigate( [ "/training" ] );
  }

  registerUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString()
    };
    this.authSuccess();
  }

  login( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString()
    };
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate( [ "/login" ] );
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null;
  }
}
