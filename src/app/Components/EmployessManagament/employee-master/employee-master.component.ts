import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { EmployeeGroupModel } from '../../../Shared/Models/Employee-group';
import { EmployeeGroupState } from '../../../Store/EmployeeMaster/employees-group.reducer';
import {
  deleteEmployeeGroup,
  loadEmployeeGroups,
} from '../../../Store/EmployeeMaster/employees-group.actions';
import {
  selectAllEmployeeGroups,
  selectLoading,
} from '../../../Store/EmployeeMaster/employees-group.selectors';
import { DeleteDialogComponent } from '../../CommonComponent/Dialog/delete-dialog/delete-dialog.component';
import { CryptoService } from '../../../helperService/CryptoService/crypto.service';

@Component({
  selector: 'app-employee-master',
  standalone: true,
  imports: [RouterLink, DeleteDialogComponent],
  templateUrl: './employee-master.component.html',
  styleUrl: './employee-master.component.css',
})
export class EmployeeMasterComponent implements OnInit {
  employeeGroups$: EmployeeGroupModel[] = [];
  loading$: boolean = false;
  _ids: number | null = null;
  _showDeleteDialog: boolean = false; // open delete dialog
  _actionsVisibility: boolean[] = []; // used Action button

  _searchTerm: string = ''; // ---------------- paginator
  _currentPage: number = 1; // ---------------- paginator
  _itemsPerPage: number = 7; // ---------------- paginator
  _displayedItems: EmployeeGroupModel[] = []; // ---------------- paginator html component display valuse



  constructor(private _store: Store<EmployeeGroupState>,
    private router: Router,
    private $cryptDataService: CryptoService,
  ) {
    this._store.select(selectLoading).subscribe((item) => {
      this.loading$ = item;
    });
  }

  navigateToPermission(userGroupID: number) {
    const id = this.$cryptDataService.encryptData(userGroupID)
    this.router.navigate(['/user/employee-group/permission'], { queryParams: { userGroupID: id } });
  }

  navigateToEdit(userGroupID: number) {
    const id = this.$cryptDataService.encryptData(userGroupID)
    this.router.navigate(['/user/employee-group/edit'], { queryParams: { userGroupID: id } });
  }


  ngOnInit(): void {

    this._store.dispatch(loadEmployeeGroups());

    this._store.select(selectAllEmployeeGroups).subscribe((item) => {
      if (item && item.length > 0) {
        this.employeeGroups$ = item;
        this.updateDisplayedData(); // ---------------- paginator
      }
    });
  }


  // Action
  toggleActionsVisibility(index: number): void {
    this._actionsVisibility[index] = !this._actionsVisibility[index];
  }

  // ---------------- paginator start
  updateDisplayedData(): void {
    const filteredList = this.employeeGroups$.filter(
      (data) =>
        data.Name.toLowerCase().includes(this._searchTerm.toLowerCase()) ||
        data.UserGroupCode.toString().includes(this._searchTerm)
    );

    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(
      startIndex + this._itemsPerPage,
      filteredList.length
    );
    this._displayedItems = filteredList.slice(startIndex, endIndex);
  }

  onSearch(event: any): void {
    this._searchTerm = event.target.value;
    this._currentPage = 1;
    this.updateDisplayedData();
  }

  previousPage(): void {
    if (this._currentPage > 1) {
      this._currentPage--;
      this.updateDisplayedData();
    }
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.employeeGroups$.length / this._itemsPerPage);
    if (this._currentPage < maxPage) {
      this._currentPage++;
      this.updateDisplayedData();
    }
  }

  // ---------------- paginator end

  toggleDeleteDialog(id: number) {
    this._ids = id;
    this._showDeleteDialog = !this._showDeleteDialog;
    this._actionsVisibility = new Array(this.employeeGroups$.length).fill(
      false
    );
  }

  delete(): void {
    if (this._ids !== null) {
      this._store.dispatch(deleteEmployeeGroup({ id: this._ids }));
      this.toggleDeleteDialog(0);
    }
  }
}
