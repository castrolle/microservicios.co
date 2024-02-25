import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { GAService } from 'src/app/services/ga.service';
import { EventMessage } from 'src/app/shared/messages/event.message';

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
  public inputAiSearch: string;


  public user: Observable<SocialUser>;

  constructor(
    
    private eventMessage: EventMessage,

    private ga: GAService
  ) { }

 
  ngOnInit() {
   
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



}

