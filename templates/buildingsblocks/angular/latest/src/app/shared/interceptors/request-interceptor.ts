import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventMessage } from '../messages/event.message';
import { GAInstrumental } from '../instrumental/ga.instrumental';


const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private eventMessage : EventMessage, private instrumental : GAInstrumental) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(!req.url.includes('http://localhost:1337') && !req.url.includes('https://co-cms-proxy-personas.herokuapp.com')){
    
      var jwt_token = localStorage.getItem('accessToken');
      var jwt_token_activate = localStorage.getItem('jwt-token-activate');
      var provider = localStorage.getItem('authProvider');        
  
      if (jwt_token != null && !(req.url.includes('/access-token') || req.url.includes('registro')  || req.url.includes('activar'))) {
        let request = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + jwt_token)
                             .set('Provider', provider)
                             .set('Content-Type', 'application/json')
        });
  
        return next.handle(request).pipe(
          catchError(e => {      
               
            //429 to many request
            if (e instanceof HttpErrorResponse) {            
              if(e.status == 401 || e.status == 403){             
                this.eventMessage.broadcast({name : 'interceptor.error.401', data: e.message});                        
              }else if(e.status == 429){
                this.eventMessage.broadcast({name : 'interceptor.error.429', data: e.message});                        
              }
              this.instrumental.sendEvent('transaction','error',e.error);
            } 
  
             
             return throwError(e);
          })
          )
  
      } else  if (jwt_token != null && (req.url.includes('/access-token') || req.url.includes('registro'))) {
        let request = req.clone({
          headers: req.headers.set('Provider', provider)
        });
        return next.handle(request);
      } else  if (jwt_token_activate != null && (req.url.includes('activar'))) {
       
        let request = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + jwt_token_activate)
                             .set('Provider', provider)
        });
        return next.handle(request);
      }

      
    }
    
    return next.handle(req);
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
      console.log((`${operation} failed: ${error.message}`));
      console.log((`${error.error}`));

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };

  }

}


