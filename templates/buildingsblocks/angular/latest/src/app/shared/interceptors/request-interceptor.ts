
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventMessage } from '../messages/event.message';
import { GAInstrumental } from '../instrumental/ga.instrumental';
import { LocalStorageService } from '../services/local-storage.service';


const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private eventMessage : EventMessage, private instrumental : GAInstrumental, private storageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    
  
   
    
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



