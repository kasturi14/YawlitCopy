import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signupfirst',
  templateUrl: './signupfirst.component.html',
  styleUrls: ['./signupfirst.component.css']
})
export class SignupfirstComponent implements OnInit {

  constructor(private auth:AuthService) { }

  //sets the authenicated user as a partner or a customer
  setPartner()
  {
    this.auth.setUser("Partner");
  }
  setCustomer()
  {
    this.auth.setUser("Customer");
  }

  
  ngOnInit(): void {
  }

}
