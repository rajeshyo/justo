import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  userdata:any
  userlogin = 0;
  roleId:any;

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
    private router: Router,

  ) {
    this.initializeApp();

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
      /*  if(this.VersionNumber != this.Versionlive){
          this.alertUpdate();
        }*/
        // Show loading indicator
     //  console.log('NavigationStart', event);
    //   var myobj = document.getElementsByClassName("tooltip");
    this.localdata();
      // myobj.remove();
        //console.log(myobj);
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      //  console.log('NavigationEnd', event);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      this.statusBar.styleDefault();
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
    this.userdata=loginData;
    if(this.userdata !=null){
      this.userlogin = 1;
      this.roleId = localStorage.getItem('roleid');

    }
  return this.userdata
  }
  
  logout() {
    localStorage.clear();
    this.userlogin = 0;
    this.navCtrl.navigateRoot('/signup');
  };
}
