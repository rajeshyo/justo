import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavController, LoadingController, ToastController, AlertController, IonInfiniteScroll,
  IonContent } from '@ionic/angular'; 
@Component({
  selector: 'app-gown',
     templateUrl: './gown.page.html',
     styleUrls: ['./gown.page.scss'],
})
export class GownPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  cdata= []
  topdata= []
  topdata1=[]
  deals=[]
  wishlist=[]
  arrayOne=[]
  arrfdata=[]
  deals1=[]
  finaldt:any;
  data: any;
  page:any;
  filterid:any;
  Error_message: string = "";
  totalrecords: number = 0;
  scrollTopButton = false;
  limit:any;
  disable = 0;
  cart = [];
  items = [];
  datareceive:String="";
  loaderToShow: any;

  constructor(
    public navCtrl: NavController,
    public router:Router,
    private http: HttpClient,
    private cartService: CartService,
    public activatedRouter:ActivatedRoute,
    public loadingCtrl: LoadingController,

    ) {
        this.page =1;
    this.limit =5;

    

   }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((data)=>{
        this.finaldt = data.id;

        this.getproductlist();

        if(this.finaldt != NaN || this.finaldt != undefined ){
         
        }
      });
    //this.activatedRouter.queryParams.subscribe((data)=>{
        // console.log("-----------------------------------------------");
     //   this.finaldt = data.id;
        // console.log("-----------------------------------------------");
//      this.datareceive =JSON.stringify(data);
//      this.finaldt=this.datareceive
//      console.log("product1",this.finaldt.id)
   // })

    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    //this.getproductlist();

   this.productlistbycat();
    this.dealsproduct();
    this.dealsproduct1();
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
      this.wishlist =this.data.result.products
      console.log("getwishlist",this.data.result.products);
      return this.deals;  
    })
    .catch(console.log);
  
  
  }
  cartdata(data){
    let maindata = JSON.stringify(data);
    localStorage.setItem('cartdata', maindata);
    this.router.navigate(['cart'],{queryParams:{data:maindata}})
    console.log("router id",data)
  }
  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  search(){
    this.navCtrl.navigateRoot('/search');
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
  // addtocart() {
  //   let url = environment.baseurl
  //   const session = localStorage.getItem('session');
  //   var formdata = new FormData();
  //   formdata.append('_operation','getProductsBySubCategory');
  //   formdata.append('_session',session);
  //   formdata.append('id',this.finaldt);


  //   this.http.post( url,formdata,{})
  //   .toPromise()
  //   .then(response => {
  //     this.data = response;
  //     this.topdata =this.data.result.products
  //     console.log("productlist",this.data.result.products);
  //     return this.topdata;
  //   })
  //   .catch(console.log);


  // }

   async getproductlist(event?){
    if (this.page == 1) {
      this.topdata = [];
    }
    const loader =  await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
    let url = environment.baseurl;
    // localStorage.setItem('orderdata', JSON.stringify(this.data.result.products));
    const session = localStorage.getItem('session');
    //const finaldt = this.finaldt;
    var formdata = new FormData();
    formdata.append('_operation','getProductsBySubCategory');
    formdata.append('_session',session);
    formdata.append('id',this.finaldt);

    formdata.append('maxEntries',this.limit);
    formdata.append('page',this.page);
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {

      loader.dismiss();

      this.data = response;

      if( this.data.result.products == null || this.data.result.products == 'null' || this.data.result.products == '') {

        this.Error_message = 'No any data found.';
        this.totalrecords=0;

      }else { 
          let pdata = this.data.result.products;

          if (this.page == 1) {
            this.topdata = new Array();
            this.scrollToTop();
           // this.infiniteScroll.disabled = false;
          }
          if (pdata.length != 0) {

            for (let value of pdata) {
              this.topdata.push(value);
            }
            if (event) {
              event.target.complete();
            }
          } else {
            if (event) {
              event.target.disabled = true;
            }
          }

          if (pdata.length == 0 || pdata.length < this.limit) {
           // this.infiniteScroll.disabled = true;
            this.disable = 1;
          }else{
            this.disable = 0;
          }
        }
        this.page = this.page+1;



     // this.topdata =this.data.result.products
      console.log("productlist",this.topdata);
    })
    .catch(console.log);


  }
  scrollToTop() {
    this.content.scrollToTop(0);
    this.scrollTopButton = false;
  }
  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
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

  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({}).then(res => {
      res.present();

      res.onDidDismiss().then(dis => {
        console.log("Loading dismissed!");
      });
    });
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 1000);
  }
}

