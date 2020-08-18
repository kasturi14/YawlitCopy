import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  //Customer is an interface consisting of all the fields of a logged in user
  appUser: Customer;

  constructor(private auth: AuthService) {
    
    //We get the currently logged in user and subscribe the data of that user to appUser variable 
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  ngOnInit(): void {
  }

}
