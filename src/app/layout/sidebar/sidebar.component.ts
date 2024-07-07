import { Component, Output,EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isExpanded = false;
  _isOpen1 = false; // used by subitems open
  _isOpenEmpManagament = false; // used by subitems open

  constructor(private _router: Router) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.toggleSidebarEvent.emit();
  }

  toggleOpen1() {
    this._isOpen1 = !this._isOpen1;
    this._isOpenEmpManagament = false;
  }

  toggleOpenEmpManagament() {
    this._isOpen1 = false;
    this._isOpenEmpManagament = !this._isOpenEmpManagament;
  }

  closeSidebar() {
    this.isExpanded = false;
    this.toggleSidebarEvent.emit();
  }

}
