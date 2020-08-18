import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  form: FormGroup;
  faFacebook=faFacebook;
  faInstagram=faInstagram;
  faTwitter=faTwitter;
  faLinkedin=faLinkedin;
  faGooglePlus=faGooglePlus;
  faPaperPlane=faPaperPlane;
  faMapPin=faMapPin;
  faEnvelope=faEnvelope;
  faPhoneAlt=faPhoneAlt
  faChevronCircleRight=faChevronCircleRight;
  faCopyright=faCopyright;
  closeResult: string;
  
  constructor(private _snackBar: MatSnackBar,private http: HttpClient,private modalService: NgbModal,private fb: FormBuilder,private db:AngularFireDatabase) {
    this.createForm();
   }

   //creates the contact form and adds the validators
   createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  //Sends a post request to the formspree api when the user submits the contact form
  onSubmit() {
     const {name, phone, email, message} = this.form.value;
     const date = Date();
     let formRequest = { name, phone, email, message, date };

     // constructing the header for the post request
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    //sends the data the user submits to the messages table in the database
    this.db.list('/messages').push(formRequest);
     
    this.form.reset();
       
    return this.http.post("https://formspree.io/xrgaqobq", 
            {
                name: formRequest.name,
                _replyto: formRequest.email,
                message: formRequest.message+" Contact number is: "+formRequest.phone+" Sent at "+formRequest.date
            },
            httpOptions
        ).subscribe(res => {
          this._snackBar.open("We have Recieved Your Message!", "Thank You!", {
            duration: 10000,
          });
        }); 
  }

  ngOnInit(): void {
  }

  //Opens the terms and services modal on being triggered
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
}