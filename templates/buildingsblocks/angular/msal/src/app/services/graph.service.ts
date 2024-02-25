
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private userData = new BehaviorSubject(null);
   constructor( private http: HttpClient, private router: Router) {

  }



  me() {
    return this.http.get<any>(environment.GRAPH_ENDPOINT+'/me');
  }

  memberOf() {
    return this.http.get<any>(environment.GRAPH_ENDPOINT+'/me/memberOf');
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
      this.log(`${error.error}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };

  }

  /** Log a HeroService message with the MessageService */
  private log(message: any) {
    console.log(message);
  }


  

}



