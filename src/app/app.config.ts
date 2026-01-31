import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingSpinnerInterceptor } from './core/interceptors/loading-spinner-interceptor';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { errorsInterceptor } from './core/interceptors/errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    
    
    provideHttpClient(withFetch(), withInterceptors([errorsInterceptor,tokenInterceptor,loadingSpinnerInterceptor])),
    provideAnimations(),
    provideToastr({
      preventDuplicates:true,
    }), // Toastr providers,
    
  ],
};
