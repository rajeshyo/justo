import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  cart = [];
  items = [];
  data: any;
  deals1=[]
  deals=[]
  topdata1=[]
  topdata=[]

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRouter:ActivatedRoute,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.getwishlist();
  }

  removewishlist(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addtowishlist');
    formdata.append('_session',session);
    formdata.append('record',id);
    formdata.append('module',"Products");
    formdata.append('value',"0");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("dealslist1",this.data.result.products);
      // this.navCtrl.navigateRoot('/wishlist');
      this.getwishlist()
      return this.topdata1;

    })
    .catch(console.log);


  }
  
  getwishlist() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','getWishListProducts');
    formdata.append('_session',session);

    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals =this.data.result.products
      console.log("getwishlist",this.data.result.products);
      return this.topdata;

    })
    .catch(console.log);


  }
  // closeModal() {
  //   this.modalCtrl.dismiss();
  // }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
}
