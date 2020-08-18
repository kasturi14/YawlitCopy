import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PlansService } from 'src/app/plans.service';

@Component({
  selector: 'app-admin-pincode',
  templateUrl: './admin-pincode.component.html',
  styleUrls: ['./admin-pincode.component.css']
})
export class AdminPincodeComponent implements OnInit {

  pin$: BehaviorSubject<string|null>;

  //this variable gives the current page number
  pa: number = 1;
  
  pincodes$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  
  constructor(private db:AngularFireDatabase,private plansService:PlansService) { 

    this.pin$ = new BehaviorSubject(null); 
    //to get the observable list of the pincode table
    this.pincodes$ = this.pin$.pipe(
      switchMap(size => 
        this.db.list('/Pincode', ref =>
          size ? ref.orderByChild('Pincode').equalTo(size) : ref
        ).snapshotChanges()
      )
    );

  }

  //deletes the pin selected by the from the database
  delete(key)
  {
    if (!confirm('Are you sure you want to delete this event?')) return;
    this.plansService.deletePins(key);
  }

  filterBy(size: string|null) {
    this.pin$.next(size);
  }

  ngOnInit(): void {}
}
