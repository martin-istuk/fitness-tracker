import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.authService.login( {
      email: form.value.email,
      password: form.value.password
    } )
  }
}
