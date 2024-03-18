import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'integration-manager';

  currentUserSubscription: Subscription | undefined;

  mySubscription: any;

  loged: boolean = false;

  constructor(
     private router: Router, private activatedRoute: ActivatedRoute){

     

     
  }

}


