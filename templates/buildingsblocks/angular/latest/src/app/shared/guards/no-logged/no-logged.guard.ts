/* import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from "../../authentication/login/login.service";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AppConfig } from 'src/app/configs/app-config';
import { Storage } from '../../local-storage/storage';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedGuard implements CanActivate {
  constructor(private _LOGIN: LoginService,
    private ngZone: NgZone,
    private router: Router,
    private _localStorage: Storage) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._localStorage.setItem(AppConfig.TOKEN_NAME_SSO_JTWT(), next.params["idToken"]);
    if (next.params["idToken"]) {
      return this._LOGIN.validateAuthToken(next.params["idToken"])
        .pipe(
          map(result => {

            console.log(result);
            if (result) {
              this.ngZone.run(async () => {
                await this.router.navigateByUrl('/comunidades/dash');
              });
              return false;
            } else {
              location.href = environment.SSO_ENDPOINT;
              this.router.navigateByUrl('/comunidades/dash');
              return false;
            }
          })
        );
    } else {
      location.href = environment.SSO_ENDPOINT;
      return false;
    }

  }

}
 */

