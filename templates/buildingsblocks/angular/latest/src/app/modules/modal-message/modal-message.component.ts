import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  


  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {

  }

	@Input() message: string;
  @Input() type: string;
  @Input() tittle: string;
  @Input() callback: any;

  
  

  onCancelClick(): void {
    this.activeModal.close();
  }

  onOkClick(): void {
    
    this.callback.onOk("ok");
    this.activeModal.close();
  }



}


