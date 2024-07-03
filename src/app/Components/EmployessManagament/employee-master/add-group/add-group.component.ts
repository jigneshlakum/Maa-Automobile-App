import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { generateCouponCode } from '../../../../Middleware/Code-generator';
import { createEmployeeGroup,getEmployeeGroupById } from '../../../../Store/EmployeeMaster/employees-group.actions';
import { Store } from '@ngrx/store';
import { EmployeeGroupModel } from '../../../../Shared/Models/Employee-group';
import { TosterService } from '../../../../helperService/Toster/toster.service';
import { selectEmployeeGroupState } from '../../../../Store/EmployeeMaster/employees-group.selectors';
import { CryptoService } from '../../../../helperService/CryptoService/crypto.service';

@Component({
  selector: 'app-add-group',
  standalone: true,
  ReactiveFormsModule
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css',
})
export class AddGroupComponent implements OnInit {
  _label: string = 'Create';
  _isSelectToggle: boolean = true;
  loading: boolean = false; // Flag to control loader visibility
  activateId =  this._activateroute.snapshot.paramMap.get('userGroupID');


  constructor(
    private builder: FormBuilder,
    private _store: Store,
    private _toster: TosterService,
    private _activateroute: ActivatedRoute,
    private $cryptDataService: CryptoService,
  ) {}

  ngOnInit(): void {

    this._activateroute.queryParams.subscribe(params => {
      const encryptedUserGroupID = params['userGroupID'];
      const userGroupID = this.$cryptDataService.decryptData(encryptedUserGroupID);
      this.activateId = userGroupID
    });

    if (!this.activateId) {
      const generatedCode = generateCouponCode(6);
      this.employeeform.get('UserGroupCode')?.setValue(generatedCode);
    }

    this.employeeform.get('IsActive')?.setValue(this._isSelectToggle);
    if (this.activateId) {
      this.getEmployeeById(Number(this.activateId));
      this._label = 'Update';
    }
  }

  //  Edit call Function if  UserGroupID true
  private getEmployeeById(UserGroupID : number){
    this._store.dispatch(getEmployeeGroupById({ id: UserGroupID }));
    this._store.select(selectEmployeeGroupState).subscribe((item) => {
      this._store.select(selectEmployeeGroupState).subscribe((state) => {
        if (state.selectedEmployeeGroup) {
          this.employeeform.patchValue({
            Name: state.selectedEmployeeGroup.Name,
            UserGroupCode: state.selectedEmployeeGroup.UserGroupCode,
            IsActive: state.selectedEmployeeGroup.IsActive,
          });
          this._isSelectToggle = state.selectedEmployeeGroup.IsActive;
        }
      });
    });
  }


  employeeform = this.builder.group({
    Name: ['', [Validators.required]],
    UserGroupCode: [{ value: '', disabled: true }, Validators.required],
    IsActive: [true],
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeform.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onToggleChange(event: any): void {
    this._isSelectToggle = event.target.checked;
    this.employeeform.get('IsActive')?.setValue(this._isSelectToggle);
  }

  onSubmit() {
    try {
      this.loading = true; // Show loader
      this.employeeform.markAllAsTouched();
      if (this.employeeform.valid) {
        const employeeGroup: EmployeeGroupModel = {
          id: 0,
          UserGroupID: Number(this.activateId) || 0,
          Name: this.employeeform.get('Name')?.value ?? '',
          UserGroupCode: this.employeeform.get('UserGroupCode')?.value ?? '',
          IsActive: this.employeeform.get('IsActive')?.value ?? false,
        };
        this._store.dispatch(createEmployeeGroup({ employeeGroup }));
        this.loading = false; // Hide loader on success
      } else {
        this._toster.error('Please fill all required fields.', 'Error');
        this.loading = false;
      }
    } catch (error) {
      this._toster.error('catch' + error, 'Error');
      this.loading = false;
    }
  }
}
