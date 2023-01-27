import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  public formLogin: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService    
    ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      clientId: ['', Validators.required],
      clientSecret: ['', Validators.required]
    });   
    
  }

  authGoogle(){
    this.authService.signInWithGoogle().then(r => {              
      window.location.href = '/';
    });    
  }

  auth(value: any): void {  
   
                         
    this.authService.login(value).subscribe(result => {                        
      window.location.href = '/';
    });
}


}
