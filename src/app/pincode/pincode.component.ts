import { Component, OnInit } from '@angular/core';
import { PlansService } from '../plans.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent{

  constructor(private plansService:PlansService,private router:Router) { }

  //A new pincode object created by the user is pushed to the database
  savePincode(value)
  {
    this.plansService.createPincode(value);
  }


}
