// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-gown',
//   templateUrl: './gown.page.html',
//   styleUrls: ['./gown.page.scss'],
// })
// export class GownPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-gown',
     templateUrl: './gown.page.html',
     styleUrls: ['./gown.page.scss'],
})
export class GownPage implements OnInit {

  cdata= []
  topdata= []
  topdata1=[]
  deals=[]
  arrayOne=[]
  arrfdata=[]
  deals1=[]
  finaldt:any;
  data: any;

  cart = [];
  items = [];
  datareceive:String="";
  constructor(
    public router:Router,
    private http: HttpClient,
    private cartService: CartService,
    public activatedRouter:ActivatedRoute,
    ) {

   }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((data)=>{
        // console.log("-----------------------------------------------");
        this.finaldt = data.id;
        // console.log("-----------------------------------------------");
//      this.datareceive =JSON.stringify(data);
//      this.finaldt=this.datareceive
//      console.log("product1",this.finaldt.id)
    })
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.productlist();
    this.productlistbycat();
    this.dealsproduct();
    this.dealsproduct1();

  }

  cartdata(data){
    let maindata = JSON.stringify(data);
    localStorage.setItem('cartdata', maindata);
    this.router.navigate(['cart'],{queryParams:{data:maindata}})
    console.log("router id",data)
  }

  productlist() {
    let url = environment.baseurl
    // localStorage.setItem('orderdata', JSON.stringify(this.data.result.products));
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getProductsBySubCategory');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.topdata =this.data.result.products
      console.log("productlist",this.data.result.products);
      return this.topdata;
    })
    .catch(console.log);


  }


  productlistbycat() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getOnlyProductsOfCategory');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.topdata1 =this.data.result.products
      console.log("productlistbycat",this.data.result.products);
      return this.topdata1;
    })
    .catch(console.log);


  }

  dealsproduct() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getDealsOfTheDayProducts');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals =this.data.result.products
      console.log("dealslist",this.data.result.products);
      return this.topdata1;
    })
    .catch(console.log);


  }

  dealsproduct1() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getDealsOfTheDayProducts');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("dealslist1",this.data.result.products);
      return this.topdata1;
    })
    .catch(console.log);


  }
  productdetails(id){
  this.router.navigate(['shirtdetail'],{queryParams:{id:id}})
  console.log("router id",id)
}

  addToCart(product,id) {
    this.router.navigate(['shirtdetail'],{queryParams:{id:id}})

    this.cartService.addProduct(product);
    console.log()

  }

  detailproduct(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    var formdata = new FormData();
    formdata.append('_operation','getProductDetails');
    formdata.append('_session',session);
    formdata.append('id',id);


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals =this.data.result.productsDetails
      let productdetails = [];
      console.log("productdetailss",productdetails)

      productdetails.push(this.data.result.productsDetails)
      // this.deals.arrayOne.push(this.arrfdata)
      console.log("productdetailss",productdetails)

      if(localStorage.getItem('orderdetails')!=null){
        
        productdetails= JSON.parse(localStorage.getItem('orderdetails'))
        
      }
    


      localStorage.setItem('orderdetails', JSON.stringify(productdetails));

      console.log("orderdata",this.data.result.productsDetails);
      return this.topdata1;
    })
    .catch(console.log);


  }
}

