
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { share, filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


const helper = new JwtHelperService();
const TOKEN_KEY : string = 'accessToken';
const DATA_KEY = 'authData';

@Injectable({
  providedIn: 'root'
})
export class EventMessage {
 
  observable : Observable<any>;
  observer: Observer<any>;
 
   constructor( ) {
    //this.observable = new Observable(this.observer : Observer);
    this.observable = Observable.create((observer : Observer<any>) => {
      this.observer = observer;
    }).pipe(share());
  }

  subscribe(eventName : any , callback:any){
      
    const subscriber : Subscription = this.observable
          .pipe (
              filter(event => {               
                return event.name  === eventName;
              })
          ).subscribe(callback);
    return subscriber;
  }

  broadcast(event: any){
      if(this.observer != null){
        this.observer.next(event);
    }
  }

  destroy(subscriber : Subscription){
    subscriber.unsubscribe();
  }


}

