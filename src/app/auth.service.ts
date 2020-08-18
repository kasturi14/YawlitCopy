import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute , Router } from '@angular/router';
import { Customer } from './models/customer';
import { UserSaveService } from './user-save.service';
import {switchMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>; 
  userloggingIn:string;
  userloggedIn:string;


  constructor(private afAuth: AngularFireAuth , private route: ActivatedRoute, private router: Router, private userService: UserSaveService) {
    //the currently logged in user
    this.user$ = afAuth.authState;
   }


   //sets the user as either a partner or a customer based on the data coming from the signup page 1
   setUser(s:string)
   {
      this.userloggingIn=s;
   }


  
  loginwgoogle()
  {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((authResult) => {
      //sets the user as a customer or a partner
      this.setLoggedInUser();
      //saves the data of the user to the database upon successful login
      this.saveUser();
      this.router.navigate(['/updateProfile']);
    }).catch(error => {
        //console.log(error);
        });
    
  }

  setLoggedInUser()
  {
    this.userloggedIn=this.userloggingIn;
    localStorage.setItem("loggedIn",this.userloggedIn); //sets whether the user is logged in as a partner or a customer
  }


  saveUser()
  {
    this.user$.subscribe(u => {
      if(!u) return; //checks the auth state of the user
        if(localStorage.getItem("loggedIn")=="Customer")
        {
          this.userService.save(u); // if the user is logged in as a Customer his data is saved under the customer's table else partner's table
        }
        else if(localStorage.getItem("loggedIn")=="Partner")
        {
          this.userService.savePartner(u);
        }
      });
  }

  //logs out the currently logged in user and removes his id from the localStorage upon logOut
  logout()
  {
    if(localStorage.getItem("loggedIn")=="Customer")
    {
    this.afAuth.auth.signOut().then(()=>
    {
      localStorage.removeItem("CustomerKey");
    });
    }
    else if(localStorage.getItem("loggedIn")=="Partner")
    {
      this.afAuth.auth.signOut().then(()=>
    {
      localStorage.removeItem("PartnerKey");
    });
    }
    localStorage.removeItem("loggedIn");
    this.router.navigate(['/']);
  }


  //gets the data of the currently logged in user as an observable
  get appUser$() 
  : Observable<Customer>
  {
    return this.user$.pipe(switchMap
      (user =>{
        if(user && localStorage.getItem("loggedIn")=="Customer")
        {
          //user.uid is the key of the user
          return this.userService.get(user.uid).valueChanges();}
        else if(user && localStorage.getItem("loggedIn")=="Partner")
        {
          return this.userService.getPartner(user.uid).valueChanges();
        }
        else
          return of(null);}));

  }
}
