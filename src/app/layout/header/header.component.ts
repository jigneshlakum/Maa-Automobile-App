import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/reducers';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  constructor(
    private auth: AuthenticationService,
    private store: Store<AppState>
  ) {
  }


  _messagesActive = false; // Used by Messages Popup
  _notificationActive = false; // Used by Notifications Popup
  _showProfile = false; // Used by Profile Popup

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  // Used by Notifications Popup
  toggleProfile(): void {
    this._showProfile = !this._showProfile;
    this._messagesActive = false;
    this._notificationActive = false;
  }

  // Used by Messages Popup
  toggleMessages(): void {
    this._messagesActive = !this._messagesActive;
    this._notificationActive = false;
    this._showProfile = false;
  }

  // Used by Notifications Popup
  toggleNotification(): void {
    this._notificationActive = !this._notificationActive;
    this._messagesActive = false;
    this._showProfile = false;
  }

  logout() {
    this.auth.logout()
  }
}
