import {  HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TosterService } from '../helperService/Toster/toster.service';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastService: TosterService, private $authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';

                if (error.error instanceof ErrorEvent) {
                    console.error('Client-side error occurred:', error.error.message);
                    errorMessage = `Client-side error occurred: ${error.error.message}`;
                } else {
                    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
                    errorMessage = `Backend returned code ${error.status}, ${error.error}`;
                }

                if (error.status === 404) {
                    errorMessage = 'Product not found';
                } else if (error.status === 500) {
                    errorMessage = 'Internal server error';
                } else if (error.status === 401) {
                    errorMessage = 'Unauthorized';
                    this.logoutAndClearLocalStorage(); // Call logout and clear local storage
                } else {
                    errorMessage = 'An error occurred';
                }

                this.toastService.error(errorMessage, 'Error'); // Display toast message

                return throwError(() => errorMessage);
            })
        );
    }

    private logoutAndClearLocalStorage() {
        this.$authenticationService.removeAuthToken()
        localStorage.clear();
    }
}
