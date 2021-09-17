import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule  } from '@angular/common/http';
import {SignupService} from '../app/services/signup.service'
import {HomeService} from '../app/services/home.service'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VerificationPipe } from './verification.pipe';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service'; // Here is the import line

// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  declarations: [AppComponent, VerificationPipe],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SignupService,
    HomeService,
    SplashScreen,
    AuthGuard,
    Geolocation,
    NativeGeocoder,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
}) 
export class AppModule {}
