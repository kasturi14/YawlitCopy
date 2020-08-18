import { Component, OnInit } from '@angular/core';
import { UserSaveService } from '../user-save.service';
import { YourPlans } from '../models/yourPlans';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.css']
})
export class EarnComponent implements OnInit {

  faCaretLeft=faCaretLeft;
  faCaretRight=faCaretRight;
  PeakHours:number=0;
  NonPeakHours:number=0;
  WorkingDays:number=0;
  DaysCalculated:number=0;
  DailyPay:number=0;
  MonthlyPay:number=0;
  private slidVal:string;
  allowedAccess:boolean=false;
  CustomerKey:string;
  PartnerKey:string;

  constructor(private userSave:UserSaveService,private auth:AuthService,private router:Router) {
    
    //the initial value of the slider in the calculator page
    this.slidVal="SP";

    //gets the currently logged in user or the partner's key which is stored in the database
    this.CustomerKey=localStorage.getItem("CustomerKey");
    this.PartnerKey=localStorage.getItem("PartnerKey");

    //The access os the calculator is allowed only to the partners
    if(this.PartnerKey)
    {
      this.allowedAccess=true;
    }
  }


  //checks if the current logged in user is a customer or a partner
  check()
  {
    if(this.CustomerKey)
    {
      if (!confirm('You have to be logged in as a Partner! Do you want to logout and sign in as a Partner?')) 
      return;
      else
      {
      this.auth.logout();
      this.router.navigate(['/signUpFirst']);}

    }
    else
    {
      if (!confirm('You have to be logged in as a Partner! Please sign in as a Partner to continue with your order!'))
      {
        return;}
        else
        {
        this.router.navigate(['/signUpFirst']);}
    }
  }


  //functioning part of the slider
  slidyy()
  {
    if(this.slidVal=="SP")
    {
      this.slidVal="VP";
      this.cal(this.PeakHours,this.NonPeakHours,this.WorkingDays);
      
    }
    else{
      this.slidVal="SP";
      this.cal(this.PeakHours,this.NonPeakHours,this.WorkingDays);
    }
  }


//initializing the peak hours with the value user selects in the scale slider in the calculator page
  initializePeak(event)
  {
    this.PeakHours=event.value;
    this.cal(this.PeakHours,this.NonPeakHours,this.WorkingDays);
  }

//initializing the non peak hours with the value user selects in the scale slider in the calculator page
  initializeNonPeak(event)
  {
    this.NonPeakHours=event.value;
    this.cal(this.PeakHours,this.NonPeakHours,this.WorkingDays);
  }

//initializing the WorkingDays with the value user selects in the scale slider in the calculator page
  initializeDays(event)
  {
    this.WorkingDays=event.value;
    this.cal(this.PeakHours,this.NonPeakHours,this.WorkingDays);
  }

  //the working part of the calculator calculating the daily and monthly pay
  cal(x,y,d)
  {
      this.DaysCalculated=x*6+y*4;
      if(this.slidVal=="SP")
        this.DailyPay=x*60+y*20;
      else
        this.DailyPay=x*60+y*33;
      this.MonthlyPay=this.DailyPay*d;
  }
  ngOnInit() {
  }
}
