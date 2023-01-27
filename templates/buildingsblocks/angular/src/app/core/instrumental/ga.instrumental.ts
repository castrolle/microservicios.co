import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GAInstrumental  {
  

  constructor()   {
  
  }
    
  sendEvent(eventCategory:string, eventAction:string, message: string) {
   
   
    var response = (<any>window).ga('send', {
        hitType: 'event',
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: message
      });  
      
  }

     
}