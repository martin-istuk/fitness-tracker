import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private UIService: UIService
  ) {}

  isLoading: boolean = false;
  private loadingSubs: Subscription;
  maxDate: Date;

  ngOnInit() {
    this.loadingSubs = this.UIService.loadingStateChanged.subscribe(
      loadingState => {
        this.isLoading = loadingState
      }
    );

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

  onSubmit(form: NgForm) {
    this.authService.registerUser( {
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
