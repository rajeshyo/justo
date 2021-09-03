import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-jewellery',
  templateUrl: './jewellery.page.html',
  styleUrls: ['./jewellery.page.scss'],
})
export class JewelleryPage implements OnInit {
  cart = [];
  items = [];
  constructor( private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
}
