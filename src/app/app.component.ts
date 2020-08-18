import { Component, OnInit } from '@angular/core';
import { UserSaveService } from './user-save.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ECC';
  constructor(private userSave: UserSaveService, private auth: AuthService,private router: Router){
  
  }
}

