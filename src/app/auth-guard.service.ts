import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private auth: AuthService, private router: Router) { }

  //checks if a user is logged in or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    return this.auth.user$.pipe(map(user => {
      if(user) return true;
       
      this.router.navigate(['/'], {queryParams: {returnUrl : state.url}});
      return false;
    }));

  }
}
