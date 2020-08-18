import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Plans } from './models/Plans';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  
  private editPlanId:string;
  private vehicle:string;
  private editServiceId:string;
  private ServiceVehicle:string;
  private SimplePremium:string;
  private serviceType:string;
  constructor(private db:AngularFireDatabase,private auth:AuthService) { }

  //pushes the new plan created by the admin to the database in the plans table
  create(user,vehicle:string,plan:string){
    this.db.list('/plans/'+vehicle+'/'+plan).push(user);
  }
//pushes the new service created by the admin to the database in the plans table
  createService(user,vehicle:string,serviceType:string){
    this.db.list('/services/'+vehicle+'/'+serviceType).push(user);
  }

  //returns a list of all the services present in the database
  getAllServices(vehicle,serviceType:string){
    return this.db.list('/services/'+vehicle+'/'+serviceType).valueChanges();
  }

   //returns a list of all the plans present in the database
  getAll(vehicle,SimplePremium){
    return this.db.list('/plans/'+vehicle+'/'+SimplePremium).valueChanges();
  }
  
  //pushes a new pincode entered by the user to the database
  createPincode(value)
  {
    this.db.list('Pincode').push(value);
  }

  //to get all the pincodes present in the database
  getPins(){
    return this.db.list('/Pincode').valueChanges();
  }


  //deletes a pin from the database
  deletePins(pinId)
  {
    return this.db.object('/Pincode/'+ pinId).remove();
  }

  //deletes a plan from the database
  deletePlans(vehicle,SimplePremium,planId)
  {
      return this.db.object('/plans/'+ vehicle+'/'+SimplePremium+'/'+planId).remove();
  }

  //deletes a service from the database
  deleteServices(vehicle,serviceType,id)
  {
    return this.db.object('/services/'+ vehicle+'/'+serviceType+'/'+id).remove();
  }


  //a settor function to set the plan id for the updation of the plan which is invoked in the admin-plans component
  setid(editId: string,vehicle,SimplePremium)
  {
    this.editPlanId=editId;
    this.vehicle=vehicle;
    this.SimplePremium=SimplePremium;
  }

  //a settor function to set the service id for the updation of the service which is invoked in the admin-services component
  setServiceid(id:string,vehicle,serviceType:string)
  {
    this.editServiceId=id;
    this.ServiceVehicle=vehicle;
    this.serviceType=serviceType;
  }

  //to get a particular plan with a specific id
  getPlan(id)
  {
    return this.db.object('/plans/'+ this.vehicle+'/'+this.SimplePremium+'/'+id).valueChanges();
  }

  //to get a particular service with the given id
  getService(id)
  {
    return this.db.object('/services/'+ this.ServiceVehicle+'/'+this.serviceType+'/'+id).valueChanges();
  }

  //the gettor function to get the id of plan which has to be updated, invoked in updatePlan component
  showPlanId()
  {
    return this.editPlanId;
  }

  //the gettor function to get the id of service which has to be updated,invoked in updatePlan component
  showServiceId()
  {
    return this.editServiceId;
  }

  //to update a particular plan
  updatePlan(planId,plan)
  {
    return this.db.object('/plans/'+ this.vehicle+'/'+this.SimplePremium+'/'+planId).update(plan);
  }

  //to update a particular service
  updateService(serviceId,service)
  {
    return this.db.object('/services/'+ this.ServiceVehicle+'/'+this.serviceType+'/'+serviceId).update(service);
  }

}

