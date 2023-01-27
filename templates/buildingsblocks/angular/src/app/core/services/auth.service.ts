
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';



const helper = new JwtHelperService();
const TOKEN_KEY : string = 'accessToken';
const DATA_KEY = 'authData';
const PROVIDER_KEY = 'authProvider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private user = new BehaviorSubject<SocialUser>(null);

 
  constructor(
    private storage: LocalStorageService, 
    private http: HttpClient, 
    private router: Router,
    private authService: SocialAuthService
    ) {
      

      this.authService.authState.subscribe((user) => {     
        
        this.storage.setItem(DATA_KEY, JSON.stringify(user));          
        this.storage.setItem(TOKEN_KEY, user.idToken);
        this.storage.setItem(PROVIDER_KEY, 'Google');
        
        this.user.next(user); 
        
      });
    this.loadStoredToken();
  }

  


  signInWithGoogle(): Promise<SocialUser> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
  }

 
  login(credentials) {
    // Normally make a POST request to your APi with your login credentials
    /*if (credentials.email != 'saimon@devdactic.com' || credentials.pw != '123') {
      return of(null);
    }*/

    // return this.http.post<any>(`${environment.url}v1.0/token`, { 'password': credentials.pw, 'username': credentials.email }).
    return this.http.post<any>(environment.URL_API+'/access-token', credentials).
      pipe(
        take(1),
        map(res => {
          return res.accessToken;
        }),
        switchMap(token => 
                {
         
          
          if(this.user.value == null){
            this.user.next(new SocialUser());  
          }
          
          const decoded = helper.decodeToken(token);                  
          this.user.value.idToken = token;
          this.user.value.firstName = decoded.name;
          this.user.next(decoded);          
          this.storage.setItem(DATA_KEY, JSON.stringify(decoded));          
          localStorage.setItem(TOKEN_KEY, token);
          this.storage.setItem(PROVIDER_KEY, 'Own');
                   
          return token;
        })
      );
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      this.log(`${error}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };

  }

  /** Log a HeroService message with the MessageService */
  private log(message: any) {
    console.log(message);
  }

  loadStoredToken() {   
    var tokenJson = this.storage.getItemJSON(DATA_KEY);
    var provider = localStorage.getItem('authProvider');
    var  authData = JSON.parse(localStorage.getItem('authData'));
    if(provider === 'Google' && authData != null && authData.idToken != null){       
      localStorage.setItem(TOKEN_KEY, authData.idToken);  
    }
          
    if(tokenJson != null){      
      this.user.next(tokenJson);
    }
    
  }

  getUser() :Observable<SocialUser>{
    return this.user;
  }

  logout() {
    try{
      this.authService.signOut();
    }catch(err){
      //this.log(err);
    }
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(DATA_KEY);      
    window.location.href = '/#/login';   
    window.location.reload();
    
  }

  
  isAuthenticated(): boolean {
    // debugger;
    let payload = this.storage.getItemJSON(DATA_KEY);
    if (payload != null) { // Estaba user_name, pero el Payload no tiene un atributo user_name, sino sub
      return true;
    } else {
      return false;
    }
  }

  

}

