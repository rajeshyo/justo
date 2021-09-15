// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-shirtdetail',
//   templateUrl: './shirtdetail.page.html',
//   styleUrls: ['./shirtdetail.page.scss'],
// })
// export class ShirtdetailPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component,OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

 @Component({
  selector: 'app-shirtdetail',
   templateUrl: './shirtdetail.page.html',
   styleUrls: ['./shirtdetail.page.scss'],
})

export class ShirtdetailPage implements OnInit {
  cart = [];
  items = [];
  images = ['shirt1.png','shirt1.png','shirt1.png'];
  show = false;

  cdata= []
  topdata= []
  topdata1=[]
  deals=[]
  deals1=[]
  finaldt:any;
  data: any;
   
    
    constructor(public activatedRouter:ActivatedRoute, private http: HttpClient, public navCtrl: NavController, private cartService: CartService, ){}
  ngOnInit() {

    this.activatedRouter.queryParams.subscribe((data)=>{
      this.finaldt = data.id;

  })
  this.detailproduct();

    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();

    this.addtocart1();
    this.getwishlist();

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
      return this.deals;
  
    })
    .catch(console.log);
  
  
  }
  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  detailproduct() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getProductDetails');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals =this.data.result.productsDetails
      console.log("detailsproductdata",this.data.result.productsDetails);
      return this.topdata1;
    })
    .catch(console.log);


  }

  addtocart(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addToCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    formdata.append('qty',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("cartdataaa",this.data.result.products);
      this.navCtrl.navigateRoot('/cart');
      return this.topdata1;

    })
    .catch(console.log);


  } 
  addtocart1() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    // const foo = this.Integer.parseInt(userid);
    // let y = +userid; 
    const orderdetails = localStorage.getItem('orderdetails');
  
    var formdata = new FormData();
    formdata.append('_operation','getCartProducts');
    formdata.append('_session',session);
    // formdata.append('productId',id);
    formdata.append('userId',userid);
    // formdata.append('qty',"1");
  
  
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.cart =this.data.result.products
      console.log("count",this.cart.length)
      console.log("cartdataaa",this.data.result.products);
      // this.navCtrl.navigateRoot('/cart');
      return this.cart;
  
    })
    .catch(console.log);
  
  
  }
  goToEditProfile() {
    this.navCtrl.navigateForward('/continue-shop');
  }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
 
}
 



