import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { reducers } from './Store/reducers';
import { effects } from './Store/effects';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './Services/authentication.service';
import { withFetch, provideHttpClient } from '@angular/common/http';



const configToster = {
  timeOut: 2000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};


export function checkTokenExpiration(authService: AuthenticationService) {
  return () => authService.checkTokenExpiration();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideHttpClient(),
    provideClientHydration(),
    provideToastr(configToster),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25 }),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    AuthenticationService,
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: checkTokenExpiration,
      deps: [AuthenticationService],
      multi: true,
    },

  ],
};
