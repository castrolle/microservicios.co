import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormGroup: FormGroup;
  public saved: boolean = false;

  isExpired: any = true;
  urlSSO: string = '';

  documents: Array<any> = [];

  tokenDecoded: any = null;
  tokenDecodedInfo: any = null;
  textPerfil: string = "";

  public currentUser: User;
  public displayName : string;

  constructor(
    public form: FormBuilder,
    private broadcastService: BroadcastService, 
    private msalService: MsalService, 
    private router: Router
  ) {
    this.loginFormGroup = this.form.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    console.log('init')
    this.broadcastService.subscribe('msal:loginSuccess', () => {           
      this.router.navigate(['/dashboard']);
    });
  }


  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    if (isIE) {
      this.msalService.loginRedirect();
    } else {
      this.msalService.loginPopup({prompt:"select_account"});
    }

  }
}



