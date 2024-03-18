import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: []
 })
export class SectionsComponent implements OnInit {
 
  constructor(
    private readonly fb: FormBuilder,  
    private readonly router: Router
  ) { }

  ngOnInit() {

  }

}

