import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RequestInterceptor } from './core/interceptors/request-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { EventMessageComponent } from './shared/messages/event-message.component';
import { SectionsComponent } from './sections/sections.component';
import { SectionsModule } from './sections/sections.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventMessageComponent,
    LoginComponent
    
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SectionsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '430643588491-kl0qk8n4cp4cmhvqkb3dfnig76naij0m.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
