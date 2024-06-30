import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectError, selectLoading } from '../../Store/UserAction/selectors';
import { AuthState } from '../../Shared/Models/UserModel';
import { login } from '../../Store/UserAction/actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  _isLoading: boolean = false;
  error$: Observable<string | null> = this.store.select(selectError);

  constructor(private builder: FormBuilder,
    private store: Store<AuthState>) {}


  ngOnInit(): void {
    this.store.select(selectLoading).subscribe((item) => {
      this._isLoading = item;
    });
  }


  loginform = this.builder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginform.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  signIn() {
    if (this.loginform.valid) {
      this._isLoading = true;
      const email = this.loginform.value.email || '';
      const password = this.loginform.value.password || '';
      this.store.dispatch(login({ email, password }));
    } else {
      this.loginform.markAllAsTouched();
    }
  }
}
