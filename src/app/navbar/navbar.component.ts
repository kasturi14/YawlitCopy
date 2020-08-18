import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare const openNav: any;
declare const closeNav: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: Customer; 
  navbarOpen = false;
  showSpinner: boolean = true;

  faUser=faUser;
  faBars=faBars;
  faTimes=faTimes;
  faSortDown=faSortDown;

  events: string[] = [];
  opened: boolean;

  mode = new FormControl('over');
  constructor(private auth: AuthService,private route:Router) {
    auth.appUser$.subscribe(appUser => {
    this.appUser = appUser;
      this.showSpinner = false;
    });
  }
  scrolltop()
  {
    window.scrollTo(0,0);
  }
  logout() {
    this.auth.logout();
  }
  openN() {
    openNav();
  }
  closeN() {
    closeNav();
  }
  ngOnInit(): void {
  }

}
