import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.sass']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
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

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout()
  }

}
