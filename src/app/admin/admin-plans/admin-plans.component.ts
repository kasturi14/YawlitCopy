import { Component, OnInit } from '@angular/core';
import { Plans } from 'src/app/models/Plans';
import { PlansService } from 'src/app/plans.service';
import { AngularFireList, AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.css']
})
export class AdminPlansComponent implements OnInit {

  private vehicle:string;
  size$: BehaviorSubject<string|null>;

  //holds the current page number(pagination)
  pa:number=1;

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
   SimplePremium:string="Simple";
  constructor(private planService:PlansService,private db:AngularFireDatabase,private route:Router) {
    
   }

   //sets the type of vehicle user selects for setting the path to the plans table
  setSedan()
  {
    this.vehicle="Sedan";
    this.setData();
  }
  setSUV()
  {
    this.vehicle="SUV";
    this.setData();
  }
  setBike()
  {
    this.vehicle="Bike";
    this.setData();
  }
  setHatchback()
  {
    this.vehicle="Hatchback";
    this.setData();
  }

  //selects the type of the plan which is also required to set the path of the database
  slider()
  {
    if(this.SimplePremium ==="Simple")
      this.SimplePremium ="Premium";
    else
      this.SimplePremium = "Simple";
    this.setData();
  }

  //to get a list of observables of the plans/vehicle/type_of_plan table
  setData()
  {
    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size => 
        this.db.list('/plans/'+this.vehicle+'/'+this.SimplePremium, ref =>
          size ? ref.orderByChild('PlanName').equalTo(size) : ref
        ).snapshotChanges()
      )
    );
  }


  //to delete a particular plan
  delete(key)
  {
    if (!confirm('Are you sure you want to delete this event?')) return;

    this.planService.deletePlans(this.vehicle,this.SimplePremium,key);
  }


  //if the user wants to update the information of a particular plan we set the id of that plan using a service(named as PlanService)
  edit(key)
  {
    this.planService.setid(key,this.vehicle,this.SimplePremium);
    this.route.navigate(['/admin/plans/',key]);
  }

  
  filterBy(size: string|null) {
    this.size$.next(size);
  }


  ngOnInit(): void {
  }

}
