import { Component, OnInit } from '@angular/core';

import { Customer } from '../models/customer';
import { AuthService } from '../auth.service';
import { UserSaveService } from '../user-save.service';
import { YourPlans } from '../models/yourPlans';
import { Plans } from '../models/Plans';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminOrderDetails } from '../models/AdminOrderDetails';
import { AdminServiceDetails } from '../models/AdminServiceDetails';
import { FormControl } from '@angular/forms';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';


declare const openNav: any;
declare const closeNav: any;

@Component({
  selector: 'app-yourplans',
  templateUrl: './yourplans.component.html',
  styleUrls: ['./yourplans.component.css']
})
export class YourplansComponent implements OnInit {

  mode = new FormControl('over');
  faUser=faUser;
  faBars=faBars;
  faTimes=faTimes;
  faSortDown=faSortDown;
  appUser: Customer;

  //stores the unique booking id's of all the booked plans by a particular user
  yourPlan:YourPlans[];

  //stores the unique booking id's of all the booked services by a particular user
  yourService:YourPlans[];

  //stores all the Upcoming plans
  Upcoming=[];  
  
  UpcomingServices=[]; //stores all the Upcoming services  
  
  Current=[];//stores all the active plans
  Past=[];//stores all the past plans
  PastServices=[];//stores all the past services
  UpcomingOrActive=[];//an array which is manipulated to upcoming plans or active plans based on the value of the plans slider
  PastOrUpcoming=[];//an array which is manipulated to past services or upcoming services based on the value of the services slider
  public order:AdminOrderDetails=<any>{};
  public service:AdminServiceDetails=<any>{};
  navbarOpen = false;
  showSpinner: boolean = true;
  val:string;
  valS:string;
  partner:boolean=false;
  customer:boolean=false;


  constructor(private auth: AuthService,private userSave:UserSaveService,private db:AngularFireDatabase) {
    
    //gets the currently logged in user and subscibes the data to the 'appUSer' object
    auth.appUser$.subscribe(appUser => {
    this.appUser = appUser;
      this.showSpinner = false;
    });

    //checks if the user is logged in as a Partner or a Customer
    if(localStorage.getItem("PartnerKey"))
      this.partner=true;
    else if(localStorage.getItem("CustomerKey"))
    {
      this.customer=true;
      //gets all the BookedPlans of the user and stores it in an array 'YourPlans'
      this.userSave.getAllBookedPlans().subscribe((yourPlans) => {
        //the array stores the booking key of all the booked plans
      this.yourPlan = yourPlans as YourPlans[];

      //gets the booking key of each booked plan and calls the getPlan function to get the data of the booked plan
      for(let i=0;i<this.yourPlan.length;i++)
      {
        this.getPlan(this.yourPlan[i].BookingKey);
      }
     });

     //checks if a plan's state is upcoming or Active
     this.UpcomingOrActive=this.Current;
     this.val="Active";
     
     //gets all the BookedServices of the user and stores it in an array 'yourServices' 
      this.userSave.getAllBookedServices().subscribe((yourServices)=>{
        //the array stores the booking key of all the booked services
        this.yourService=yourServices as YourPlans[];

        //gets the booking key of each booked service and calls the getService function to get the data of the booked service
        for(let i=0;i<this.yourService.length;i++)
      {
        this.getService(this.yourService[i].BookingKey);
      }
     });
     this.PastOrUpcoming=this.UpcomingServices;
     this.valS="Upcoming";
    }
  }

  getPlan(OrderId)
  {
    //gets the current date and compares it with the plan's starting and ending date to check if a plan is upcoming or active or past
    const current = new Date();

    //gets the details of that plan whose booking key is sent and stores it in a 'order' object
    this.db.object('/Orders/'+OrderId).valueChanges().subscribe((p:any) =>
    {
      this.order = p;
      const start = new Date(this.order.startDate);
      const end=new Date(this.order.endDate);
      if(current>=start && current<=end)
          this.Current.push(this.order);
      else if(end<current && start<current)
      {
          this.Past.push(this.order);
      }
      else if(current<start && current<end)
      {
          this.Upcoming.push(this.order);
      }
      
    });

  }


  getService(OrderId)
  {
    const current = new Date();
    this.db.object('/OrdersService/'+OrderId).valueChanges().subscribe((p:any) =>
    {
      //stores the service whose booking id is sent in the 'service' obj
      this.service = p;

      //compares the date of the service with the current date to check if it is an upcoming or a past service
      const date = new Date(this.service.Date);
      if(current>date)
          this.PastServices.push(this.service);
      if(current<date)
          this.UpcomingServices.push(this.service);
      
    });
  }

  //calls the logout function
  logout() {
    this.auth.logout();
  }


  //handles the sidebar opening and closing
  openN() {
    openNav();
  }
  closeN() {
    closeNav();
  }

//if the current value of the slider is set to active we change it to upcoming and vice versa on click and varry the array accordingly
  slider()
  {
    if(this.val=="Active")
    {
      this.val="Upcoming";
      this.UpcomingOrActive=this.Upcoming;
    }
    else
    {
      this.val="Active";
      this.UpcomingOrActive=this.Current;
    }
  }


  //if the current value of the slider is set to upcoming we change it to past on click and vice versa and thus varry the array accordingly
  sliderser()
  {
    if(this.valS=="Upcoming")
    {
      this.valS="Past";
      this.PastOrUpcoming=this.PastServices;
    }
    else
    {
      this.valS="Upcoming";
      this.PastOrUpcoming=this.UpcomingServices;
    }
  }

  ngOnInit(): void {
  }

}
