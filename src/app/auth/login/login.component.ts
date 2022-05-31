import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private UIService: UIService
  ) {}

  isLoading: boolean = false;
  private loadingSubs: Subscription;

  ngOnInit() {
    this.loadingSubs = this.UIService.loadingStateChanged.subscribe(
      loadingState => {
        this.isLoading = loadingState
      }
    );
  }

  onLogin(form: NgForm) {
    this.authService.login( {
      email: form.value.email,
      password: form.value.password
    } )
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe()
    }
  }

}
