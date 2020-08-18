import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlansService } from 'src/app/plans.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {
  private vehicle:string;
  ServiceRef: AngularFireList<any>;
  services$: Observable<any[]>;
  private SimplePremium:string="Simple";
  constructor(private planService:PlansService,private db:AngularFireDatabase,private route:Router) { }
  
   //sets the type of vehicle user selects for setting the path to the services table
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

  //selects the type of the service which is also required to set the path of the database
  slider()
  {
    if(this.SimplePremium ==="Simple")
      this.SimplePremium ="Premium";
    else
      this.SimplePremium = "Simple";
    this.setData();
  }

//to get a list of observables of the services/vehicle/type_of_plan table
  setData()
  {
    this.ServiceRef = this.db.list('/services/'+this.vehicle+'/'+this.SimplePremium);
    this.services$ = this.ServiceRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
    }))
  })
    );
  }
  
   //to delete a particular service 
  deleteService(key)
  {
    if (!confirm('Are you sure you want to delete this event?')) return;

    this.planService.deleteServices(this.vehicle,this.SimplePremium,key);
  }

  //if the user wants to update the information of a particular service we set the id of that service using an Angularservice(named as PlanService)
  editService(key)
  {
    this.planService.setServiceid(key,this.vehicle,this.SimplePremium);
    this.route.navigate(['/admin/services/',key]);
  }
  ngOnInit(): void {
  }

}
