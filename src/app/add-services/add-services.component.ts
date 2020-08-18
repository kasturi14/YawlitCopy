import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansService } from '../plans.service';
import { Services } from '../models/Services';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent {

  private keyPlan:string;
  public updatedService:Services=<any>{};
  private service_subscription:SubscriptionLike;

  constructor(private plansservice:PlansService,private route:Router) {

    //gets the id of the service the user selects to edit
    this.keyPlan=plansservice.showServiceId();

   }


   saveService(value)
  {
    //if the user selects an existing service to update the data the database is updated with the new edited fields
    if(this.keyPlan)
    {
      this.plansservice.updateService(this.keyPlan,this.updatedService);
      this.service_subscription.unsubscribe();}
    //the else part executes when the user creates a new service thus pushing the new service in the database
    else{
      this.plansservice.createService(value,value.Vehicle,value.ServiceType);
    }
      this.route.navigate(["/adminservices"]);
  }

  ngOnInit(): void {
    //if the user wants to update an existing service we get the id of that service in the keyPlan variable
    if(this.keyPlan)
    {
    this.service_subscription=this.plansservice.getService(this.keyPlan).subscribe((p:any) =>
    {
      //We subscribe the service the user selects to the updatedService object so that we can bind the data of that service using ngModel in the form
      this.updatedService = p;});
    }
  }

}
