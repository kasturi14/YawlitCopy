import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminOrderDetails } from '../models/AdminOrderDetails';
import { Subscription } from 'rxjs';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-order-details-admin',
  templateUrl: './order-details-admin.component.html',
  styleUrls: ['./order-details-admin.component.css']
})
export class OrderDetailsAdminComponent implements OnInit,OnDestroy {
  private orders;
  private services;
  private partners;
  subscription:Subscription;
  serviceSubscription: Subscription;
  partnerSubscription:Subscription;


  constructor(private orderService:OrderServiceService) {
   //to get all the PlansOrders 
    this.subscription=this.orderService.getOrders().subscribe(orders =>{
      this.orders = orders;
      });

      //to get all the services orders
      this.serviceSubscription=this.orderService.getServices().subscribe(services => {
        this.services = services;
      });

      //to get all the registered partners
      this.partnerSubscription=this.orderService.getPartners().subscribe(partners => {
        this.partners = partners;
      });
   }

   //OrdersPlans download
   download(){
    this.orderService.downloadFile(this.orders, 'jsontocsvPlans');
  }

  //OrdersServices download
  downloadServices(){
    this.orderService.downloadFileService(this.services, 'jsontocsvServices');
  }

  //OrdersPartners download
  downloadPartners(){
    this.orderService.downloadFilePartners(this.partners, 'jsontocsvPartners');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
