import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {firebaseConfig} from "./firebase-config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(provideFirebaseApp(() =>
        initializeApp(firebaseConfig)
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
