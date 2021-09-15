
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
   templateUrl: './profile.page.html',
     styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
     
   }

  ngOnInit() {
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
      this.navCtrl.navigateForward('/home');
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


