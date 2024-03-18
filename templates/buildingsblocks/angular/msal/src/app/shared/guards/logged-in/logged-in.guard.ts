import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Storage } from 'src/app/core/local-storage/storage';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private _router: Router
  ) {

  }
  public localStorage: Storage = new Storage();
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    var roles = this.localStorage.getItemString('roles');
    console.log(roles);
    
    if(roles != null && roles.includes(environment.ADMIN)){
      return true;
    }else{
      //this._router.navigate(['/error']);
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {

    return false;
  }
}

