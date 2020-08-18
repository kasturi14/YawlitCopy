import { Component, OnInit, HostListener } from '@angular/core';
import { UserSaveService } from '../user-save.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import {SubscriptionLike} from 'rxjs';
import {Customer} from '../models/customer';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public id: string;
  public updated:Customer=<any>{};
  
  private user_subscription:SubscriptionLike;
  private partner_subscription:SubscriptionLike;
  constructor(private user: UserSaveService,private auth: AuthService,private db:AngularFireDatabase,private route:Router) {
    
  }
  


  saveUpdate(user1)
  {
    //We check whether the user is logged in as a Customer or a Partner and we get their key to update their data in the database
    if(localStorage.getItem("CustomerKey"))
    {
    this.user.update(localStorage.getItem("CustomerKey"),this.updated);
    this.user_subscription.unsubscribe();}
    if(localStorage.getItem("PartnerKey"))
    {
    this.user.updatePartner(localStorage.getItem("PartnerKey"),this.updated);
    this.partner_subscription.unsubscribe();}


    this.route.navigate(["/"]);
  }

  ngOnInit() {

    //gets the data of the currently logged in user checking if he is logged in as a customer or a partner and subscribes the data to the 'updated' object so that we can bind it in the form
    if(localStorage.getItem("CustomerKey"))
    {
    this.user_subscription=this.db.object('/users/'+localStorage.getItem("CustomerKey")).valueChanges().subscribe((p:any) =>this.updated = p);
    }
    if(localStorage.getItem("PartnerKey"))
    {
      this.partner_subscription=this.db.object('/Partners/'+localStorage.getItem("PartnerKey")).valueChanges().subscribe((p:any) =>this.updated = p);
    }
    //Navigate to the home page if the user presses the browser back button
    window.history.pushState( {} , 'Home', '/' );
     window.history.pushState( {} , 'Profile', '/updateProfile' );
  }
}
