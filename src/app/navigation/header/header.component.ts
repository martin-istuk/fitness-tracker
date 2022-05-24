import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;

  constructor(
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(
      authStatus => { this.isAuth = authStatus }
    )
  }
  ngOnDestroy() {
    this.authSub.unsubscribe()
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout()
  }

}
