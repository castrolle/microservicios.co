import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public article: any;
  public published_at: any;
  @ViewChild('container') d1:ElementRef;

  constructor(
    private route: ActivatedRoute) { }


    ngAfterViewInit(){
           
  
    }

    
  ngOnInit(): void {
  }

}
