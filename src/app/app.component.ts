import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  userdata:any

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    
    // {
    //   title: 'Men',
    //   url: '/shirt',
    //   direct: 'forward',
    //   icon: 'man'
    // },
    // {
    //   title: 'Login',
    //   url: '/signup',
    //   direct: 'forward',
    //   icon: 'person-add'
    // },
    {
      title: 'Orders',
      url: '/order',
     
      icon: 'cube'
     
    },
    {
      title: 'Contact Us',
      url: '/contactus',
      icon: 'people'
    },
 
    // {
    //   title: 'Account',
    //   url: '/account',
     
    //   icon: 'person'
     
    // }
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

  this.localdata();

  }

  localdata(){
    const loginData = JSON.parse(localStorage.getItem('logindata'));
    this.userdata=loginData
  return this.userdata
  }
  
  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/signup');
  };
}
