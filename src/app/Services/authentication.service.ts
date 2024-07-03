import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TosterService } from '../helperService/Toster/toster.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../Shared/Models/UserModel';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  private readonly TOKEN_KEY = 'token';
  private readonly EXPIRATION_KEY = 'token_expiration';
  private APIBaseUrl = environment.apiUrl;
  private readonly USER_KEY = 'user';
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(
    private router: Router,
    private _toster: TosterService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromStorage()
    );
    this.checkTokenExpiration();
  }

  login(payload: { email: string; password: string }): Observable<User> {
    return this.http.post<any>(this.APIBaseUrl + 'admin/login', payload)
      .pipe(
        map((response) => {
          if (response.status) {
            if (response.token) {
              this.setAuthToken(response.token);
              this.setUser(response.data);
            }
            return response;
          } else {
            throw new Error(response.message);
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error?.message || 'Login failed'));
        })
      );
  }

  logout(): void {
    this.removeAuthToken();
    this.router.navigate(['/login']);
    this._toster.success('You have successfully logged out!', 'Success');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  public setAuthToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);
      localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toISOString());

      this.scheduleTokenExpiration(expirationDate);
    } else {
      console.error('localStorage is not available. Your environment may not support it.');
    }
  }

  private scheduleTokenExpiration(expirationDate: Date): void {
    const timeUntilExpiration = expirationDate.getTime() - Date.now();
    setTimeout(() => {
      this.removeAuthToken();
      this.router.navigate(['/login']);
      this._toster.warning('Your session has expired. Please log in again.', 'Session Expired');
    }, timeUntilExpiration);
  }

  public getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private setUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) as User : null;
    }
    return null;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  private removeUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
  }

  public removeAuthToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.EXPIRATION_KEY);
      this.removeUser();
    }
  }

  public checkTokenExpiration(): void {
    if (isPlatformBrowser(this.platformId)) {
      const expirationDate = new Date(localStorage.getItem(this.EXPIRATION_KEY) || '');
      if (expirationDate && expirationDate.getTime() < Date.now()) {
        this.removeAuthToken();
        this.router.navigate(['/login']);
        this._toster.warning('Your session has expired. Please log in again.', 'Session Expired');
      } else if (expirationDate) {
        this.scheduleTokenExpiration(expirationDate);
      }
    }
  }
}
