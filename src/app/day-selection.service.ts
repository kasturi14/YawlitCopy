import { Injectable } from '@angular/core';
import { D2 } from './models/D2';
import { D1 } from './models/D1';

@Injectable({
  providedIn: 'root'
})
export class DaySelectionService {

  //sets the days of the 1st dropdown
  getD1() {
    return [
     new D1(1, 'Monday' ),
     new D1(2, 'Tuesday' ),
     new D1(3,'Wednesday'),
    ];
  }
  
  //sets the days of the seconnd dropdown on the basis of the ids of the date selected in the first dropdown
  getD2() {
   return [
     new D2(1, 1, 'Wednesday' ),
     new D2(2, 1, 'Thursday' ),
     new D2(3, 1, 'Friday'),
     new D2(4, 2, 'Thursday'),
     new D2(5, 2, 'Friday' ),
     new D2(6, 3, 'Friday'),
    ];
  }
}
