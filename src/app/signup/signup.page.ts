
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {FormControl, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {SignupService} from '../services/signup.service'
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);
  user: any ={publicid:"0fb102811b5b31e284a3762b4b2f918c"} // vendor
  user1: any ={publicid:"512d3a435929400d01b2f59431d6e42d"} // dealer
  userlog:any ={}
  data: any;

  @ViewChild('slider') slider: IonSlides;
  page = "0";
 
 selectedTab(index) {
     this.slider.slideTo(index);
 }
 
 async moveButton() {
     let index = await this.slider.getActiveIndex();
     this.page = index.toString();
 } 


  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private delarapi:SignupService,
    private toastService: ToastService, 
    public popoverController: PopoverController,
    ) { 

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 
  getErrorMessage() {
    return this.email.hasError('required') ? 'Please enter your email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
           
  }
 
  passFormControl = new FormControl('', [
    Validators.required, Validators.minLength(4) 
]);
     hide =false;
  
  async forgotPass() {
    
     // message: 'Enter you email address to send a reset link password.',
      const { value: email} = await swal.fire({
        title: 'Forgot Password?',
        text: 'Enter your email address to send a reset link password.',
        showCancelButton: true,
        input: 'email',
      
        inputPlaceholder: 'Enter your email'
      },)
      
      if (email) {
        swal.fire(`Entered email: ${email}`)
      }
     
  }
 
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

 submitdealer() {
    // const params = new URLSearchParams(
    //   this.user1
    // );
    // const data=(params.toString());

    let url = environment.signupurl
    let photo = (<HTMLInputElement>document.getElementById('myfile')).files[0];
    let photo1 = (<HTMLInputElement>document.getElementById('myfile1')).files[0];

    var formdata = new FormData();
    
    formdata.append('file_1_1',photo);
    formdata.append('file_1_2',photo1);

    formdata.append('_operation','loginAndFetchModules');
    formdata.append('accountname',this.user1.accountname);
    formdata.append('cf_885',this.user1.cf_885);
    formdata.append('cf_891',this.user1.cf_891);
    formdata.append('cf_893',this.user1.cf_893);
    formdata.append('cf_895',this.user1.cf_895);
    formdata.append('cf_887',this.user1.cf_887);
    formdata.append('bill_street',this.user1.bill_street);
    formdata.append('phone',this.user1.phone);
    formdata.append('email1',this.user1.email1);
    formdata.append('cf_889',this.user1.cf_889);
    formdata.append('cf_873',this.user1.cf_873);

    // formdata.append('file_1_1',this.user1.file_1_1);
    // formdata.append('file_1_2',this.user1.file_1_2);

    formdata.append('publicid','512d3a435929400d01b2f59431d6e42d');
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      console.log(response);

      this.data = response;
      if (this.data.success == true) { 

        this.toastService.presentToast('Sucessfull');
      // this.navCtrl.navigateRoot('/signup');
    
      }else{
        this.toastService.presentToast('Something Wrong');
      }
    })
    .catch(console.log);
  }
  submitvendor() {
    let url = environment.signupurl 
    var formdata = new FormData();
    formdata.append('_operation','loginAndFetchModules');
    formdata.append('vendorname',this.user.vendorname);
    formdata.append('cf_875',this.user.cf_875);
    formdata.append('cf_877',this.user.cf_877);
    formdata.append('cf_897',this.user.cf_897);
    formdata.append('cf_899',this.user.cf_899);
    formdata.append('cf_879',this.user.cf_879);
    formdata.append('street',this.user.street);
    formdata.append('phone',this.user.phone);
    formdata.append('email',this.user.email);
    formdata.append('cf_881',this.user.cf_881);
    formdata.append('cf_883',this.user.cf_883);
    formdata.append('publicid','0fb102811b5b31e284a3762b4b2f918c');

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      console.log(response);
      this.data = response;
      if (this.data.success == true) { 

        this.toastService.presentToast('Sucessfull');
      // this.navCtrl.navigateRoot('/signup');
    
      }else{
        this.toastService.presentToast('Something Wrong');
      }
    })
    .catch(console.log);
  }
  

  login() {
    let url = environment.baseurl
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','loginAndFetchModules');
    formdata.append('username',this.userlog.username);
    formdata.append('password',this.userlog.password);

    this.loading =  this.loaderPresent();

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.loadingCtrl.dismiss();

      this.data = response;
      localStorage.setItem('logindata', JSON.stringify(this.data.result.login.userdetails));
      localStorage.setItem('userid', this.data.result.login.userid);
      localStorage.setItem('roleid', this.data.result.login.userdetails.roleid);
      localStorage.setItem('rolename', this.data.result.login.userdetails.rolename);

      localStorage.setItem('session', this.data.result.login.session);
      // localStorage.setItem('userdata', this.data);

      console.log(this.data.success);

      if (this.data.result.login.isVerifiedUser == true) { 

        this.toastService.presentToast('Login Sucessfull');
      this.navCtrl.navigateRoot('/home');
    
      }else{
        this.toastService.presentToast('Something Wrong');
      this.navCtrl.navigateRoot('/verification');

      }
    })
    .catch(console.log);

  
  }

  ngOnInit() {

   this.delarapi.signupdelar().subscribe((resp)=>{
     console.log(resp)
   });
   

  }
 }
