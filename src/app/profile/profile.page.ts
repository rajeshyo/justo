
import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-profile',
   templateUrl: './profile.page.html',
     styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('filechooser', { static: false }) fileChooserElementRef: ElementRef;
  userform: FormGroup;
  userInfo:any = {};
  data: any;

  constructor( public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private toastService: ToastService, 

    ) {
     
   }

  ngOnInit() {
    const loginData = JSON.parse(localStorage.getItem('logindata'));
    this.userInfo=loginData;
    console.log(this.userInfo,localStorage.getItem("userid"));
    this.userform = new FormGroup({

      firstname: new FormControl('', [ Validators.required, Validators.maxLength(150)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      address: new FormControl('', [Validators.required]),
     

    });
  }


  saveData() {

    console.log(this.userform);
  
    let url = environment.baseurl;
    var formdata = new FormData();
    let userID = localStorage.getItem("userid");
    formdata.append('_operation', 'updateProfile');
    formdata.append('_session', localStorage.getItem("session"));
    formdata.append('userId', userID);
    formdata.append('first_name', this.userform.get('firstname').value);
    formdata.append('last_name', this.userform.get('lastname').value);
    formdata.append('address_street', this.userform.get('address').value);

        this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      
      // localStorage.setItem('userdata', this.data);

      console.log(this.data);

       if (this.data.success == true) { 
        localStorage.setItem('logindata', JSON.stringify(this.data.result.userDetails));

        this.toastService.presentToast(this.data.result.message);


      this.navCtrl.navigateRoot('/profile');
    
      }else{
        this.toastService.presentToast('Something Wrong');
      this.navCtrl.navigateRoot('/profile');

      } 
    })
    .catch(console.log);
   
 /*   var params = {
      email:  this.userform.get('email').value,
      phone:  this.userform.get('phone').value,
      address1: this.userform.get('address1').value,
      address2: this.userform.get('address2').value,
      country: this.userform.get('country').value,
      state: this.userform.get('state').value,
      city: this.userform.get('city').value,
      pincode: this.userform.get('pincode').value,
      dob: dob_date,
      userid: localStorage.getItem("IDUser"),
      inputType: 'submit'
    };

    let formData = new FormData();
  
    const jsonString = JSON.stringify(params);
    formData.append('lstRequest', jsonString);
    formData.append('fromweb', '0');
    this.commonService.post('v1/userrequest/saveUserRequestDetails', formData, 'Service Request').subscribe(
      data => {
        if (data['success'] == true) {

          this.router.navigate(['userrequest']);
          this.alertService.presentToast(data['message'], true);
         
          // this.openAddressModal();
        } else {
          this.alertService.presentToast(data['message'], true);
        }
      }
    ); */
    }

  async sendData() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
       // showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Data was Saved',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      //this.navCtrl.navigateForward('/profile');
    });
  }
  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Change Password',
      message: 'Enter your new password.',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
              //  showCloseButton: true,
                message: 'Password successfully changed.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }
  
}


