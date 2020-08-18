import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }


  get WindowRef() {
    return window;
  }

//the server code is written in index.js file in the functions folder , and the functions are hosted on firebase cloud

//send a post request to the RazorpayOrder Api 
  createOrder(orderDetails) {
    return this.http.post(environment.cloudFunctions.createOrder, orderDetails);
  }

  //sends a post request to the capture payment api
  capturePayment(paymemntDetails) {
    return this.http.post(environment.cloudFunctions.capturePayment,paymemntDetails);
}

}
