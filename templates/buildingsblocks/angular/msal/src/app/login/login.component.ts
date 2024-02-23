import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  
  public formLogin: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router  
    ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      clientId: ['', Validators.required],
      clientSecret: ['', Validators.required]
    });   
    
  }


  onSubmit(): void {
    
  }

  reloadPage(): void {
    this.router.navigate(['/']); // Redirect to the dashboard when logged in
 
  }

  


}

