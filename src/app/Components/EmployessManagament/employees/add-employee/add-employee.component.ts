import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { loadEmployeeGroups } from '../../../../Store/EmployeeMaster/employees-group.actions';
import { Store } from '@ngrx/store';
import { selectAllEmployeeGroups } from '../../../../Store/EmployeeMaster/employees-group.selectors';
import { EmployeeGroupModel } from '../../../../Shared/Models/Employee-group';
declare var $: any; // Declare jQuery


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  employeeGroupsItems$: EmployeeGroupModel[] = [];
  loading: boolean = false; // Flag to control loader visibility
  _label: string = 'Create';
  _isSelectToggle: boolean = true;

  constructor(private builder: FormBuilder, private _store: Store) {}

  ngAfterViewInit() {
    $(document).ready(function () {
      $('select').niceSelect();
    });
  }

  loadEmployeeGroups(): void {
    this._store.dispatch(loadEmployeeGroups());
  }

  ngOnInit(): void {
    this.loadEmployeeGroups(); // get Employee group
    this._store.select(selectAllEmployeeGroups).subscribe((item) => {
      if (item && item.length  && item.length !== 0) {
        console.log(item);
        this.employeeGroupsItems$ = item;
      }
    });
  }



  employeeform = this.builder.group({
    UserID: [0],
    UserName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
    PhoneNumber: ['', [Validators.required]],
    FullName: ['', [Validators.required]],
    Address: [''],
    UserGroupID: ['', [Validators.required]],
    IsActive: [true],
  });

  onToggleChange(event: any): void {
    this._isSelectToggle = event.target.checked;
    this.employeeform.get('IsActive')?.setValue(this._isSelectToggle);
  }

  onSubmit() {
    if (this.employeeform.invalid) {
      this.employeeform.markAllAsTouched();
      return;
    }
    console.log(this.employeeform);
    console.log(this.employeeform.valid);
  }
}
