import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Comunity } from '../model/Comunity';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

    constructor(
        private http: HttpClient,
    ) { }




	getcomunity(): Observable<any> {
	       return this.http.get<any[]>(`${environment.URL_API}/comunity`).pipe(
	            catchError(e => {
	                return throwError(e);
	              })
	        )
	}

   postcomunity(comunity:Comunity): Observable<any> {
       return this.http.post<any[]>(`${environment.URL_API}/comunity`, comunity).pipe(
            catchError(e => {
                return throwError(e);
              })
        )
    }

 	apigeeComunityconsultAffiliate(): Observable<any> {
       return this.http.get<any[]>(`${environment.URL_API}/apigee/Comunity/consultAffiliate`).pipe(
            catchError(e => {
                return throwError(e);
              })
        )
    }
   apigeeComunityregisterLogELK(comunity:Comunity): Observable<any> {
       return this.http.post<any[]>(`${environment.URL_API}/apigee/Comunity/registerLogELK`, comunity).pipe(
            catchError(e => {
                return throwError(e);
              })
        )
    }
 	kibanaComunityconsultAffiliate(): Observable<any> {
       return this.http.get<any[]>(`${environment.URL_API}/kibana/Comunity/consultAffiliate`).pipe(
            catchError(e => {
                return throwError(e);
              })
        )
    }
   kibanaComunityregisterLogELK(comunity:Comunity): Observable<any> {
       return this.http.post<any[]>(`${environment.URL_API}/kibana/Comunity/registerLogELK`, comunity).pipe(
            catchError(e => {
                return throwError(e);
              })
        )
    }
}
