import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GAService } from 'src/app/core/services/ga.service';
import { EventMessage } from '../../core/messages/event.message';

@Component({
  selector: 'app-event-message',
  templateUrl: './event-message.component.html',
  styleUrls: ['./event-message.component.scss']

})

export class EventMessageComponent implements OnInit, AfterViewInit {

  errors: any;
  message: any;
  title: any;
  closeResult: string;


  constructor(
    
    private eventMessage: EventMessage,
    private ga: GAService
  ) { }

 
  ngOnInit() {
    
    this.eventMessage.subscribe('interceptor.error.401', callback => {
      this.errors = callback.data;
      this.logOut();      
    });



    this.eventMessage.subscribe('interceptor.error.429', callback => {
      this.errors = 'Has alcanzado la cantidad máxima de solicitudes';
      console.log(callback.data);
      
    });


    this.eventMessage.subscribe('info', callback => {
      this.message = callback.data;      
      this.toggleModal();
    });


  }


  ngAfterViewInit(){
    this.toggleModal();
  }

  ok() {
    this.toggleModal();   
  }

  cancel() {
    this.toggleModal();
  }

  @ViewChild('modalMsg') modalMsg: ElementRef;

  toggleModal() {
       //this.mobMenu.nativeElement.classList
    if (this.modalMsg.nativeElement.className === 'hidden') {
      this.modalMsg.nativeElement.className = ''
    } else {
      this.modalMsg.nativeElement.className = 'hidden'
    }
    
    
  }





  logOut() {
   
  }


  @HostListener('selectDepartamento', ['$event'])
  selectDepartamento(e: CustomEvent) {
    console.log(e.detail);
  }

  @HostListener('selectCiudad', ['$event'])
  selectCiudad(e: CustomEvent) {
    console.log(e.detail);
  }


  @HostListener('mic.error', ['$event'])
  toManyRequest(e: CustomEvent) {
    console.log(e);
    
    if (e.detail.status != null && e.detail.status == 429) {
      this.eventMessage.broadcast({ name: 'interceptor.error.429', data: e.detail });
    } else if (e.detail.status != null && e.detail.status == 429) {
      this.eventMessage.broadcast({ name: 'interceptor.error.401', data: e.detail });
    }
  }



}
