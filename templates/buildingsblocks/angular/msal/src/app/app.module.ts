import { DecimalPipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppConfig } from "./configs/app-config";

import { SafeHtmlPipe } from "./../app/core/Pipes/safeHtml.pipe";

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CsvComponent } from './components/csv/csv.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProcessesComponent } from './components/processes/processes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { EventMessageComponent } from './components/shared/messages/event-message.component';
import { VisorComponent } from './components/visor/visor.component';
import { SectionsModule } from './sections/sections.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { TagSelectionComponent } from './components/tag-selection/tag-selection.component';
import { ListTemplateComponent } from './components/list-template/list-template.component';
import { BatchtemplatesComponent } from './components/batchtemplates/batchtemplates.component';
import { BatchtcsvComponent } from './components/batchtcsv/batchtcsv.component';
import { VisorpdfComponent } from './components/visorpdf/visorpdf.component';
import { UpdateTemplateComponent } from './components/update-template/update-template.component';


export function tokenGetter() {
  return localStorage.getItem(AppConfig.TOKEN_NAME_SSO_JTWT());
}

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    VisorComponent,
    SafeHtmlPipe,
    ProfileComponent,
    EventMessageComponent,
    ProcessesComponent,
    CsvComponent,
    TagSelectionComponent,
    ListTemplateComponent,
    BatchtemplatesComponent,
    BatchtcsvComponent,
    VisorpdfComponent,
    UpdateTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
	  SectionsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ZXingScannerModule,
    RouterModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: environment.CLIENT_ID,
          authority: 'https://login.microsoftonline.com/' + environment.production ? "" : "common" + environment.AUTHORITY_TENANT,
          redirectUri: environment.REDIRECT_URI,
          postLogoutRedirectUri: environment.LOGOUT_URI
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
    },
    {
      popUp: !isIE,
      consentScopes: [
      ],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ['https://graph.microsoft.com/v1.0/me/memberOf', ['user.read']],
        [ environment.URL_API + '/methodToCall', ['user.read']],
       
      ],
      extraQueryParameters: {}
    }
  )
  ],
  exports: [MsalModule],
  providers: [
              DecimalPipe,
    
              {
                provide: HTTP_INTERCEPTORS,
                useClass: MsalInterceptor,
                multi: true
              },
            ],
  bootstrap: [AppComponent, 

            ]
})
export class AppModule { }
