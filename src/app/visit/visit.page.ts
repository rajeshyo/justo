import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  constructor(    
    private geolocation: Geolocation
    ) { }

  ngOnInit() {
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
