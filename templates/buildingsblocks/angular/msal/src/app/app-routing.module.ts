import { CommonModule, } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { SectionsComponent } from './sections/sections.component';

import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { VisorComponent } from './components/visor/visor.component';
import { ProcessesComponent } from './components/processes/processes.component';
import { CsvComponent } from './components/csv/csv.component';
import { VisorpdfComponent } from "./components/visorpdf/visorpdf.component";
import { ListTemplateComponent } from "./components/list-template/list-template.component";
import { BatchtcsvComponent } from "./components/batchtcsv/batchtcsv.component";
import { BatchtemplatesComponent } from "./components/batchtemplates/batchtemplates.component";
import { UpdateTemplateComponent } from './components/update-template/update-template.component';

const routes: Routes =[
    { path: 'sections',          component: SectionsComponent    },   
    { path: 'visor',          component: VisorComponent    }, 
    { path: 'visorpdf',          component: VisorpdfComponent    },   
  { path: 'csv', component: CsvComponent },  
  { path: 'batchtemplates', component: BatchtemplatesComponent },
  { path: 'edittemplates/:id', component: UpdateTemplateComponent }, 
  { path: 'batchtcsv', component: BatchtcsvComponent },
  { path: 'processes', component: ProcessesComponent },  
  { path: 'listtemplate',          component: ListTemplateComponent    }, 
  { path: 'dashboard', component:  DashboardComponent,canActivate: [ MsalGuard ]},   
  { path: 'login',          component: LoginComponent },   
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule { }


