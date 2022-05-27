// CORE:
import { Component, OnInit } from '@angular/core';
// INTERNAL:
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.initAuthListener()
  }
}
