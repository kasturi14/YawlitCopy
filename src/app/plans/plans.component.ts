import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Plans } from '../models/Plans';
import { PlansService } from '../plans.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Pincode } from '../models/Pincode';
import { DatePipe } from '@angular/common';
import { D1 } from '../models/D1';
import { DaySelectionService } from '../day-selection.service';
import { PaymentsService } from '../payments.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Checkout } from '../models/Checkout';
import { Customer } from '../models/customer';
import { AuthService } from '../auth.service';
import { AdminOrderDetails } from '../models/AdminOrderDetails';
import { OrderServiceService } from '../order-service.service';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserSaveService } from '../user-save.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

declare const selectnext: any;
declare const newslidefunction: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  providers: [DatePipe, NgbModalConfig, NgbModal]
})
export class PlansComponent implements OnInit {

  faChevronCircleRight = faChevronCircleRight;
  faCaretLeft = faCaretLeft;


  ngOnInit(): void {
    this.D1array = this.selectDay.getD1(); //calls the getD1 function from the day-selection service to initialize the day1 dropdown
    this.onSelect(this.selectedDay1.id); //sends an initial id of Monday to the onSelect function
    this.WindowRef = this.paymentService.WindowRef;
    newslidefunction();
  }


  planRef: AngularFireList<any>;
  plans$: Observable<any[]>;
  vehicle: string;
  pincode: Pincode[];
  filterdpins: any[];
  message: string;
  setInitial: string;
  myDate = new Date();
  endDate = new Date();
  endPlanDate: string;
  minDate: string;
  maxDate: string;
  WindowRef: any;
  payableAmount: number;
  startDatecheckout: string;
  processingPayment: boolean;
  selectedOrderObj: Plans = <any>{};
  checkOutObj: Checkout = <any>{};
  BookingOrder: AdminOrderDetails = <any>{};
  futureBlockDate = new Date();
  minDateSet = new Date();
  SimplePremium: String = "Simple";
  private selectedPlanId: string;
  selectedDay1: D1 = new D1(1, 'Monday');
  D1array: D1[];
  D2array: D1[];
  private Pincode:string;
  appUser: Customer;
  razor_order: string;
  razor_payment: string;
  public Glitch: boolean = false;
  public CustomerKey: string;
  private PartnerKey: string;
  modalReference: any;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private userSave: UserSaveService, private Orderservice: OrderServiceService, private router: Router, private auth: AuthService, private http: HttpClient, private paymentService: PaymentsService,
    private changeRef: ChangeDetectorRef, private selectDay: DaySelectionService, private datePipe: DatePipe, private planService: PlansService, private fb: FormBuilder, private db: AngularFireDatabase) 
    {

    this.CustomerKey = localStorage.getItem("CustomerKey"); //gets the key of the customer or the partner logged in
    this.PartnerKey = localStorage.getItem("PartnerKey")

    //gets the data of the currently logged in user
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });

    //gets the complete list of Pincodes stored in the database 
    this.db.list('/Pincode').valueChanges().subscribe((pins) => {
      this.pincode = pins as Pincode[];
    });
    this.minDateSet.setDate(this.myDate.getDate() + 1); //sets the minimum starting date of the plan
    this.minDate = this.datePipe.transform(this.minDateSet, 'yyyy-MM-dd'); 
    this.endPlanDate = this.datePipe.transform(this.minDateSet, 'yyyy-MM-dd');//initializing the end plan date
    this.futureBlockDate.setDate(this.minDateSet.getDate() + 7); // sets the maximum start date of the plan
    this.maxDate = this.datePipe.transform(this.futureBlockDate, 'yyyy-MM-dd');
    config.backdrop = 'static';
    config.keyboard = false;

  }
//resets the message everytime the user checks a new pin
  resetMess() {
    this.message = null;
  }


   //calculates the end date of the plan based on the plan validity every time the user selects a new start date
  onchangeDate(date) {
    const tempDate = new Date(date);
    this.startDatecheckout = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
    tempDate.setDate(tempDate.getDate() + Number(this.selectedOrderObj.Validity));
    this.endPlanDate = this.datePipe.transform(tempDate, 'yyyy-MM-dd');

  }

  //populates the day 2 dropdown based on the id of the day selected in the day 1 dropdown
  onSelect(day1id) {
    this.D2array = this.selectDay.getD2().filter((item) => item.D1id == day1id); // the getD2 function is called from day-selection service
  }

  //check if a pincode entered in the input box is servicable
  checkPincode(pin: string) {
    this.filterdpins = this.pincode.filter(p => p.Pincode.includes(pin));
    if (this.filterdpins.length > 0)
    {
      this.Pincode=pin;
      this.message = "Yawlit is here for you";}
    else
      this.message = "Sorry! We are not servicable in your area yet:(";
  }

  fnext(containerid) {
    selectnext(containerid);
  }


  selectedOrder(p) {
    this.Glitch = false; //to show the submit button
    //proceed with the order if the user is logged in as a customer
    if (this.CustomerKey) {
      this.selectedOrderObj = p; //set the selectedOrderObj with the selected plans data
      this.selectedPlanId = p.key; //set the selected Plan ID
      const x = new Date();
      const x2 = new Date();
      x2.setDate(x.getDate() + 1);
      this.setInitial = this.datePipe.transform(x2, 'yyyy-MM-dd'); //to set an initial minimum start date of the plan
      const temp2 = new Date();
      temp2.setDate(temp2.getDate() + Number(this.selectedOrderObj.Validity));
      this.endPlanDate = this.datePipe.transform(temp2, 'yyyy-MM-dd'); //to set an initial end plan date  
      this.startDatecheckout = this.datePipe.transform(x, 'yyyy-MM-dd');
    }
    //show alert boxes when the user is not logged in as a customer
    else if (this.PartnerKey) {
      if (!confirm('You have to be logged in as a Customer to continue with your oder! Do you want to logout and sign in as a Customer?'))
        return;
      else {
        this.auth.logout();
        this.router.navigate(['/signUpFirst']);
      }

    }
    else {
      if (!confirm('You have to be logged in as a Customer to continue with your order! Please sign in as a Customer to continue with your order!')) {
        return;
      }
      else {
        this.router.navigate(['/signUpFirst']);
      }
    }
  }

  //gets the plans for the vehicles selected
  setSedan() {
    this.vehicle = "Sedan";
    this.planRef = this.db.list('/plans/' + this.vehicle + '/' + this.SimplePremium);
    this.plans$ = this.planRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    })
    );
  }
  setSUV() {
    this.vehicle = "SUV";
    this.planRef = this.db.list('/plans/' + this.vehicle + '/' + this.SimplePremium);
    this.plans$ = this.planRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    })
    );
  }
  setBike() {
    this.vehicle = "Bike";
    this.planRef = this.db.list('/plans/' + this.vehicle + '/' + this.SimplePremium);
    this.plans$ = this.planRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    })
    );
  }
  setHatchback() {
    this.vehicle = "Hatchback";
    this.planRef = this.db.list('/plans/' + this.vehicle + '/' + this.SimplePremium);
    this.plans$ = this.planRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    })
    );
  }

  //gets the plans of either type simple or premium based on the slider's value
  slider() {
    if (this.SimplePremium === "Simple") {
      this.SimplePremium = "Premium";
      this.planRef = this.db.list('/plans/' + this.vehicle + '/' + this.SimplePremium);
      this.plans$ = this.planRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
      );

    }
    else {
      this.SimplePremium = "Simple";
      this.planRef = this.db.list('/plans/' + this.vehicle + '/' + this.SimplePremium);
      this.plans$ = this.planRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
      );
    }
  }

  //as soon as we go to the checkout slide we make the Glitch variable false so that if the user clicks back the submit button is there
  /**Note:- When Glitch==true "Click here to checkout" button will be shown which is used to move to the checkout slide
  When Glitch==false "Submit" button will be shown whose function is to submit the forms data which user fills during placing the order**/
  setGlitch() {
    this.Glitch = false;
  }

  //initializes the checkOutObj object with the form's data and decodes the days according to their ids
  finalForm(value) {
    this.checkOutObj = value;
    if (value.selectday1 == 1)
      this.checkOutObj.selectday1 = "Monday";
    else if (value.selectday1 == 2)
      this.checkOutObj.selectday1 = "Tuesday";
    else
      this.checkOutObj.selectday1 = "Wednesday";
    this.Glitch = true; //to show the checkout button

  }

//fields are being set to the BookingOrder object
  bookplan() {
    //User's Name
    if (this.appUser.name)
      this.BookingOrder.Name = this.appUser.name;
    else {
      this.appUser.name = " ";
      this.BookingOrder.Name = this.appUser.name;
    }
    //First Name of the user
    if (this.appUser.first)
      this.BookingOrder.first = this.appUser.first;
    else {
      this.appUser.first = " ";
      this.BookingOrder.first = this.appUser.first;
    }

    //Second Name of the user
    if (this.appUser.second)
      this.BookingOrder.second = this.appUser.second;
    else {
      this.appUser.second = " ";
      this.BookingOrder.second = this.appUser.second;
    }

    //User's email
    if (this.appUser.email)
      this.BookingOrder.email = this.appUser.email;
    else {
      this.appUser.email = " ";
      this.BookingOrder.email = this.appUser.email;
    }

    this.BookingOrder.Phone = this.appUser.Phone; //User's Phone Number
    this.BookingOrder.Pincode=this.Pincode; //USer's Pincode

    //the booking details
    this.BookingOrder.selectday1 = this.checkOutObj.selectday1;
    this.BookingOrder.selectday2 = this.checkOutObj.selectday2;
    this.BookingOrder.selectday3 = this.checkOutObj.selectday3;
    this.BookingOrder.Time1 = this.checkOutObj.Time1;
    this.BookingOrder.Time2 = this.checkOutObj.Time2;
    this.BookingOrder.Time3 = this.checkOutObj.Time3;
    this.BookingOrder.startDate = this.startDatecheckout;
    this.BookingOrder.endDate = this.endPlanDate;
    this.BookingOrder.Price = this.selectedOrderObj.Price;
    this.payableAmount = +this.BookingOrder.Price * 100;//razorPay excepts amount in the smallest currency
    this.BookingOrder.PlanName = this.selectedOrderObj.PlanName;
    this.BookingOrder.Vehicle = this.vehicle;
    this.BookingOrder.Type = this.selectedOrderObj.Plan;
    this.BookingOrder.Address = this.appUser.Address;
    this.BookingOrder.Saving = this.selectedOrderObj.Saving;
    this.BookingOrder.WashDays = this.selectedOrderObj.WashDays;
    this.BookingOrder.Validity = this.selectedOrderObj.Validity;
    this.BookingOrder.planId = this.selectedPlanId;
    this.BookingOrder.RegNum = this.checkOutObj.RegNum;
    const BookedAt = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); //the date of booking
    this.BookingOrder.BookingDate = BookedAt;
  }

  
  cod() {
    this.modalReference.close(); //close the payment modal
    this.bookplan();//initialize the booking object
    //some alerts
    if (!this.BookingOrder.Address || !this.BookingOrder.Phone) {
      if (!confirm('You have fill up you profile to complete your transaction'))
        return;
      else
        this.router.navigate(['/yourplans']);
        return;
    }
    this.BookingOrder.Mode = "Cash On Wash"//set the payment mode
    this.Orderservice.createCOD(this.BookingOrder, this.CustomerKey);//call the createCOD function from Orders Service
    this.router.navigate(['/ThankYou']);
  }

  //the razorpay payment
  online($event) {
    this.bookplan();
    if (!this.BookingOrder.Address || !this.BookingOrder.Phone) {
      if (!confirm('You have fill up you profile to complete your transaction'))
        return;
      else
      {
        this.modalReference.close();
        this.router.navigate(['/yourplans']);
        return;
    }
  }
    this.BookingOrder.Mode = "E-Payment";
    this.processingPayment = true;
    this.initiatePaymentModal($event);
  }

  // payment partt
  initiatePaymentModal(event) {
    let receiptNumber = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;//generate a random reciept number
    let orderDetails = {
      amount: this.payableAmount,
      receipt: receiptNumber,
      notes: {
        'Plan Name': this.BookingOrder.PlanName,
        'Vehicle': this.BookingOrder.Vehicle,
        'Start Date': this.BookingOrder.startDate,
        'End Date': this.BookingOrder.endDate,
        'Day1 selected': this.BookingOrder.selectday1 + " " + this.BookingOrder.Time1,
        'Day2 selected': this.BookingOrder.selectday2 + " " + this.BookingOrder.Time2,
        'Day3 selected': this.BookingOrder.selectday3 + " " + this.BookingOrder.Time3,
      }
    }
    //trigger the order API
    this.paymentService.createOrder(orderDetails)
      .subscribe(order => {
        var rzp1 = new this.WindowRef.Razorpay(this.preparePaymentDetails(order)); //to open the razorpay window
        this.processingPayment = false; //if you want to integrate a loader
        rzp1.open();
        event.preventDefault();
      }, error => {
        //console.log(error);
      })
  }

  preparePaymentDetails(order) {

    var ref = this;
    return {
      "key": environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      "name": 'Yawlit',
      "currency": order.currency,
      "order_id": order.id,
      //image has been converted to base64
      "image": 'data:image/png;base64,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',
      "handler": function (response) {
        ref.handlePayment(response);
      },
      "notes": order.notes,
      "prefill": {
      },
      "theme": {
        "color": "#000000" 
      }
    };
  }


  handlePayment(response) {
    this.razor_order = response.razorpay_order_id; 
    this.razor_payment = response.razorpay_payment_id;
    this.paymentService.capturePayment(response)
      .subscribe(res => {
        this.BookingOrder.order_id = this.razor_order;
        this.BookingOrder.razorpay_payment_id = this.razor_payment;
        this.Orderservice.create(this.CustomerKey, this.BookingOrder); //calls the create function of the Order Service
        this.modalReference.close();
        this.router.navigate(['/ThankYou']);
        this.changeRef.detectChanges();
      },
        error => {
          //console.log(error);
        });
  }

  //open the payment modal
  open(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  //open the see more modal
  openpage2modal(content) {
    this.modalService.open(content, { centered: true });
  }
}




