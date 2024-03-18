import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SectionsComponent } from './sections.component';

@NgModule({
  declarations: [
    SectionsComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[ SectionsComponent ]
})
export class SectionsModule { }
