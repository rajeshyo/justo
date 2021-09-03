import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data = [
    {
      category: 'Bag',
      expanded: true,
      products: [
        { id: 0, name: 'Green', price: '8' },
        { id: 1, name: 'Classic', price: '5' },
        { id: 2, name: 'luxury', price: '9' },
        { id: 3, name: 'Stylish', price: '7' }
      ]
    },
    {
      category: 'Stylish Bags',
      products: [
        { id: 4, name: 'Classic', price: '8' },
        { id: 5, name: 'Stylish', price: '6' },
        { id: 6, name: 'Basic', price: '6' },
        { id: 7, name: 'Green', price: '6' }
      ]
    }
    
  ];
 
  private cart = [];
  constructor() { }
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  addProduct(product) {
    this.cart.push(product);
  }
}
