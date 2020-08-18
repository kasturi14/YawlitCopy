import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { UserSaveService } from 'src/app/user-save.service';

@Component({
  selector: 'app-signupsecond',
  templateUrl: './signupsecond.component.html',
  styleUrls: ['./signupsecond.component.css']
})
export class SignupsecondComponent implements OnInit{

  
  phone_number: number;
  appUser: Customer;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  public sent: boolean;
    showSpinner:boolean=true;
  constructor(private auth: AuthService,private router:Router,private usersave:UserSaveService) {
    auth.appUser$.subscribe(appUser =>{ this.appUser = appUser;
                                        this.showSpinner=false;});
  }

ngOnInit():void
{
  //Captcha verifier
  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
}

  //calling the loginwithgoogle method present in the authService section 
  loginwgoogle()
  {
    this.auth.loginwgoogle();
  }


  //the functioning part of the phone number authentication
  onSubmit(formData) {

    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + formData.phone_number.toString();
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then((confirmationResult) => {
        this.sent = true;
        const verification = prompt('Enter verification code');
        if (verification != null) {
          confirmationResult.confirm(verification)
            .then((good) => {
              //sets if the logged in user is partner or customer based on the option he selects on signup page 1
              this.auth.setLoggedInUser();

              //sets the phone number field of the user
              this.usersave.setPhone(phoneNumberString);

              //saves the user's data to the database
              this.auth.saveUser();
              
              this.router.navigate(["/updateProfile"]);
              //console.log("Gooood");
              
            })
            .catch((bad) => {
              // code verification was bad.
            });
        } else {
          //console.log('No verification code entered');
        }
      })
      .catch((err) => {
        //console.log('sms not sent', err);
      });
  };

}
