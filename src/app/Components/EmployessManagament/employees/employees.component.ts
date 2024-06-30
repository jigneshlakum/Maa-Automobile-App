import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEmployee } from '../../../Store/Employee/employee.action';
import { selectAllEmployee, selectLoading } from '../../../Store/Employee/employees.selectors';
import { EmployeeModel } from '../../../Shared/Models/Employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit{
  loading$: boolean = false;
  employeesData$: EmployeeModel[] = [];
  _actionsVisibility: boolean[] = []; // used Action button

  _searchTerm: string = ''; // ---------------- paginator
  _currentPage: number = 1; // ---------------- paginator
  _itemsPerPage: number = 7; // ---------------- paginator
  _displayedItems: EmployeeModel[] = []; // ---------------- paginator html component display valuse


constructor(
  private _store : Store,
) {
  this._store.select(selectLoading).subscribe((item) => {
    this.loading$ = item;
  });
}

  ngOnInit(): void {
    this._store.dispatch(loadEmployee());

    this._store.select(selectAllEmployee).subscribe((item) => {
      if (item && item.length > 0) {
        this.employeesData$ = item;
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
    const filteredList = this.employeesData$.filter(
      (data) =>
        data.Email.toLowerCase().includes(this._searchTerm.toLowerCase()) ||
        data.FullName.toString().includes(this._searchTerm)
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
    const maxPage = Math.ceil(this.employeesData$.length / this._itemsPerPage);
    if (this._currentPage < maxPage) {
      this._currentPage++;
      this.updateDisplayedData();
    }
  }

  // ---------------- paginator end


}
