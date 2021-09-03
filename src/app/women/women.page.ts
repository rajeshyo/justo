import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-women',
  templateUrl: './women.page.html',
  styleUrls: ['./women.page.scss'],
})
export class WomenPage implements OnInit {
  private buttonColor: string = "#000";
  cart = [];
  items = [];
  constructor( private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
  addToCart(product) {
    this.cartService.addProduct(product);
    this.buttonColor = "#fff";
  }
}
