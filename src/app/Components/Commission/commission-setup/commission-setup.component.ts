import { Component, OnInit } from '@angular/core';
import {
  deleteCOMMISSIONS,
  loadCOMMISSIONS,
} from '../../../Store/CommissionAction/Commission.Action';
import { Store } from '@ngrx/store';
import { CommissionModel } from '../../../Shared/Models/Commission.model';
import {
  getcustomerlist,
  isloading,
} from '../../../Store/CommissionAction/Customer.Selectors';
import { DeleteDialogComponent } from '../../CommonComponent/Dialog/delete-dialog/delete-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commission-setup',
  standalone: true,
  imports: [RouterLink,DeleteDialogComponent],
  templateUrl: './commission-setup.component.html',
  styleUrl: './commission-setup.component.css',
})
export class CommissionSetupComponent implements OnInit {
  constructor(private _store: Store) {}

  Commmissionslist: CommissionModel[] = [];
  _isLoading: boolean = false;
  _showDeleteDialog: boolean = false; // open delete dialog
  _ids: number | null = null;
  _actionsVisibility: boolean[] = [];  // used Action button

  _searchTerm: string = ''; // ---------------- paginator
  _currentPage: number = 1; // ---------------- paginator
  _itemsPerPage: number = 5; // ---------------- paginator
  _displayedCommissions: CommissionModel[] = []; // ---------------- paginator html component display valuse


  ngOnInit(): void {
    this._store.dispatch(loadCOMMISSIONS());

    this._store.select(isloading).subscribe((item) => {
      this._isLoading = item;
    });

    this._store.select(getcustomerlist).subscribe((item) => {
      if (item && item.length > 0) {
        this.Commmissionslist = item;
        this.updateDisplayedCommissions(); // ---------------- paginator
      }
    });
  }

  // Action
  toggleActionsVisibility(index: number): void {
    this._actionsVisibility[index] = !this._actionsVisibility[index];
  }

  // ---------------- paginator start
  updateDisplayedCommissions(): void {
    const filteredList = this.Commmissionslist.filter(commission =>
      commission.firstName.toLowerCase().includes(this._searchTerm.toLowerCase()) ||
      commission.id.toString().includes(this._searchTerm)
    );

    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(startIndex + this._itemsPerPage, filteredList.length);
    this._displayedCommissions = filteredList.slice(startIndex, endIndex);
  }

  onSearch(event: any): void {
    this._searchTerm =  event.target.value;
    this._currentPage = 1;
    this.updateDisplayedCommissions();
  }

  previousPage(): void {
    if (this._currentPage > 1) {
      this._currentPage--;
      this.updateDisplayedCommissions();
    }
  }

  nextPage(): void {
    const maxPage = Math.ceil(
      this.Commmissionslist.length / this._itemsPerPage
    );
    if (this._currentPage < maxPage) {
      this._currentPage++;
      this.updateDisplayedCommissions();
    }
  }

  // ---------------- paginator end

  toggleDeleteDialog(id: number) {
    this._ids = id;
    this._showDeleteDialog = !this._showDeleteDialog;
    this._actionsVisibility = new Array(this.Commmissionslist.length).fill(false);
  }

  delete() {
    if (typeof this._ids === 'number') {
      this._store.dispatch(deleteCOMMISSIONS({ id: this._ids }));
      this.toggleDeleteDialog(0)
    }
  }
}
