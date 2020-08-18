import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { WashComponent } from './wash/wash.component';
import { EarnComponent } from './earn/earn.component';
import { PlansComponent } from './plans/plans.component';
import { AboutComponent } from './about/about.component';
import { SignupfirstComponent } from './signup/signupfirst/signupfirst.component';
import { SignupsecondComponent } from './signup/signupsecond/signupsecond.component';
import { RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { UserSaveService } from './user-save.service';
import { AuthService } from './auth.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ServicesComponent } from './services/services.component';
import { AdminGuardService } from './admin-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { PlansService } from './plans.service';
import { PincodeComponent } from './pincode/pincode.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DaySelectionService } from './day-selection.service';
import { OrderDetailsAdminComponent } from './order-details-admin/order-details-admin.component';
import { OrderServiceService } from './order-service.service';
import { AddServicesComponent } from './add-services/add-services.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminPlansComponent } from './admin/admin-plans/admin-plans.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { AdminPincodeComponent } from './admin/admin-pincode/admin-pincode.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { YourplansComponent } from './yourplans/yourplans.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TabsComponent,
    WashComponent,
    EarnComponent,
    PlansComponent,
    AboutComponent,
    SignupfirstComponent,
    SignupsecondComponent,
    HomeComponentComponent,
    UpdateProfileComponent,
    ServicesComponent,
    PincodeComponent,
    OrderDetailsAdminComponent,
    AddServicesComponent,
    AdminMainComponent,
    AdminPlansComponent,
    AdminServicesComponent,
    AdminPincodeComponent,
    UpdatePlanComponent,
    YourplansComponent,
    ThankYouComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSidenavModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      //setting the child components for the tabs
      {path:'',component:HomeComponentComponent,children:[
        { path: '', component: WashComponent },
        { path: 'earns', component: EarnComponent },
        { path: 'plans', component: PlansComponent },
        { path: 'services', component: ServicesComponent }, 
      ]},
      { path: 'signUpFirst', component: SignupfirstComponent },
      { path: 'signUpSecond', component: SignupsecondComponent },
      { path: 'updateProfile', component: UpdateProfileComponent, canActivate: [AuthGuardService] },
      { path: 'about', component: AboutComponent },
      { path: 'yourplans', component: YourplansComponent, canActivate: [AuthGuardService] },
      { path: 'adminmain', component: AdminMainComponent, canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'ThankYou', component: ThankYouComponent, canActivate:[AuthGuardService]},
      { path: 'adminplans', component: AdminPlansComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'admin/plans/:id', component: UpdatePlanComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'admin/services/:id', component: AddServicesComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'adminservices', component: AdminServicesComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'adminpincode', component: AdminPincodeComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'addPincode', component: PincodeComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'adminAddPlans', component: UpdatePlanComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'addServices', component: AddServicesComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'viewOrders', component: OrderDetailsAdminComponent, canActivate: [AuthGuardService, AdminGuardService] }
    ]),
    BrowserAnimationsModule
  ],
  providers: [UserSaveService, AuthService, AuthGuardService, AdminGuardService, PlansService, DaySelectionService, OrderServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
