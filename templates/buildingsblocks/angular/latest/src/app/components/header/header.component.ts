import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GAService } from 'src/app/core/services/ga.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  public user: Observable<SocialUser>;
  public name: string;
  public photoUrl: string;

  constructor(
    private readonly authService: AuthService,
    private ga: GAService) { }


  ngOnInit() {

    this.user = this.authService.getUser();
    this.user.subscribe(r => {   
           
      if(r){
        this.name = r.firstName;
        this.photoUrl = r.photoUrl;
      }else{
        this.name = undefined;
      }
    });
  }

  @ViewChild('mobMenu') mobMenu: ElementRef;

  toggleMenu() {

    //this.mobMenu.nativeElement.classList
    if (this.mobMenu.nativeElement.className === 'md:hidden') {
      this.mobMenu.nativeElement.className = 'hidden'
    } else {
      this.mobMenu.nativeElement.className = 'md:hidden'
    }
  }


  logOut() {
    this.authService.logout();
  }

}
