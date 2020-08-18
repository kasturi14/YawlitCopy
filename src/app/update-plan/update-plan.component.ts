import { Component, OnInit } from '@angular/core';
import { Plans } from '../models/Plans';
import { PlansService } from '../plans.service';
import { SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {

  private key:string;
  public updatedPlan:Plans=<any>{};
  private plan_subscription:SubscriptionLike;
  constructor(private plansservice:PlansService,private route:Router) {

    //gets the key of the selected plan to update
    this.key=plansservice.showPlanId();
    
   }

   saveUpdatedPlan(value)
  {
    //if the user wants to update an existing plan
    if(this.key)
    {
    this.plansservice.updatePlan(this.key,this.updatedPlan);
    this.plan_subscription.unsubscribe();}

    //if the user creates a new plan
    else{
    this.plansservice.create(value,value.Vehicle,value.Plan);
    }
    this.route.navigate(["/adminplans"]);
  }

  ngOnInit(): void {
    //if the user wants to update an existing plan we get the data of that plan using the plansId
    if(this.key)
    {
    this.plan_subscription=this.plansservice.getPlan(this.key).subscribe((p:any) =>
    {
      //we subscribe the data of the selected plan to the updatedPlan object so that we can bind to the data in the form
      this.updatedPlan = p;});

    }
  }

}
