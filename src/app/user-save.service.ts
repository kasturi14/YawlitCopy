import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Customer } from './models/customer';
import {AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSaveService {
  first:boolean=true;
  public phoneNumber:string;
  constructor(private db: AngularFireDatabase,private router:Router) { }

//get all the booked plans
  getAllBookedPlans()
  {
    return this.db.list('/users/'+localStorage.getItem("CustomerKey")+'/Orders').valueChanges();
  }
   
//get all the booked services
  getAllBookedServices()
  {
    return this.db.list('/users/'+localStorage.getItem("CustomerKey")+'/Services').valueChanges();
  }
   
//save the logged in customer's data to the database
  save(user: firebase.User)
   {
     if(user.email)
     {
     this.db.object('/users/' + user.uid).update({
       name: user.displayName,
       email: user.email,
     });
     this.first=false;
    }
    else
    {
      this.db.object('/users/' + user.uid).update({
        Phone:this.phoneNumber,
      });
    }
    this.setCustomerKey(user.uid);
}

//set the uid of the currently logged in user to the localstorage
setCustomerKey(uid:string)
{
  localStorage.setItem("CustomerKey",uid);
}

//set the uid of the currently logged in user to the localstorage
setPartnerKey(uid:string)
{
  localStorage.setItem("PartnerKey",uid);
}

//save the logged in customer's data to the database
savePartner(user: firebase.User)
   {
     if(user.email)
     {
     this.db.object('/Partners/' + user.uid).update({
       name: user.displayName,
       email: user.email,
     });
     this.first=false;
    }
    else
    {
      this.db.object('/Partners/' + user.uid).update({
        Phone:this.phoneNumber,
      });
    }
    this.setPartnerKey(user.uid);
}


    //to update a customer's information stored in the database
    update(uid,user)
    {
      return this.db.object('/users/'+uid).update(user);
    }

    // to update a partner's information
    updatePartner(uid,user)
    {
      return this.db.object('/Partners/'+uid).update(user);
    }
    
//get the data of the currently logged in customer
    get(uid: string): AngularFireObject<Customer>
    {
        return this.db.object('/users/' + uid);
    }

    //get the data of the currently logged in partner
    getPartner(uid: string): AngularFireObject<Customer>
    {
        return this.db.object('/Partners/' + uid);
    }
    
    //a settor function for the phone number using phone auth called from the signupsecond component
    setPhone(phoneNumber: string)
    {
      this.phoneNumber=phoneNumber;
    }

}

