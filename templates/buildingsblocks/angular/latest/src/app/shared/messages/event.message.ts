
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';
import { ModalMessageComponent } from 'src/app/modules/modal-message/modal-message.component';
  
  @Injectable({
    providedIn: 'root'
  })
  export class EventMessage {
  
    observable : Observable<any>;
    observer!: Observer<any>;
  
    constructor(   private modalService: NgbModal) {
    
    }

    info(tittle : string, message : string , callback:any){
        
      const modalRef = this.modalService.open(ModalMessageComponent);
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.type = 'info';
      modalRef.componentInstance.tittle = tittle;
      modalRef.componentInstance.callback = callback;
  
      
    }

    error(tittle : string, message : string , callback:any){
      const modalRef = this.modalService.open(ModalMessageComponent);
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.type = 'error';
      modalRef.componentInstance.tittle = tittle;
      modalRef.componentInstance.callback = callback;
     
    }


  }






