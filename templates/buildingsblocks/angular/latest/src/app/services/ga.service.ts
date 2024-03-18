import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
declare let ga:Function; // Declare ga as a function


@Injectable({
  providedIn: 'root'
})
export class GAService  {
  
  constructor()   {  
  }
    
  sendEvent(eventCategory:string, eventAction:string, message: string) {
   
    var response = ga('send', {
        hitType: 'event',
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: message
      });  
      
  }

     
}

