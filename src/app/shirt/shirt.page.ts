import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-shirt',
  templateUrl: './shirt.page.html',
  styleUrls: ['./shirt.page.scss'],
})
export class ShirtPage implements OnInit {
  cart = [];
  items = [];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
  @ViewChild('slider') slider: IonSlides;
  page = "0";
  
  selectedTab(index) {
     this.slider.slideTo(index);
  }
  
  async moveButton() {
     let index = await this.slider.getActiveIndex();
     this.page = index.toString();
  } 
  addToCart(product) {
    this.cartService.addProduct(product);
  }
  
}
