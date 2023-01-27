import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: []
 })
export class SectionsComponent implements OnInit {
 
  constructor(
    private readonly fb: FormBuilder,  
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {

  }

}
