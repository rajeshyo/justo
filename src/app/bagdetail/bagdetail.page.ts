
import { Component,OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../cart.service';
 @Component({
  selector: 'app-bagdetail',
  templateUrl: './bagdetail.page.html',
   styleUrls: ['./bagdetail.page.scss'],
})

export class BagdetailPage implements OnInit {
  cart = [];
  items = [];
  images = ['h.png','h.png','h.png'];
  show = false;

  constructor(public navCtrl: NavController, private cartService: CartService ){}
  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
    
  goToEditProfile() {
    this.navCtrl.navigateForward('/continue-shop');
  }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
 
}
 

