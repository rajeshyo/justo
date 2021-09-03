import { Component,OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../cart.service';
 @Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  cart = [];
  items = [];
  images = ['j.png','j.png','j.png'];
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
 


  
 
 


 