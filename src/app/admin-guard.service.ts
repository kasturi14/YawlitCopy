import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot,RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private auth: AuthService,private myRoute:Router) { }

  //checks if a user is an admin or not
  canActivate()
  : Observable<boolean> 
  {
    return (this.auth.appUser$.pipe(map(appUser => {
      if(appUser.isAdmin)
        return true;
      return false;
    }
    )));
  }
  
    }
