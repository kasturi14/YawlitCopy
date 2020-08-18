import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //navigate to the home page on pressing the browser back button
    window.history.pushState( {} , 'Home', '/' );
     window.history.pushState( {} , 'ThankYou', '/ThankYou' );
  }

}
