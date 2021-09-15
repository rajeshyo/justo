
import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage {
 
  @ViewChild('slideWithNav') slideWithNav: IonSlides;
  @ViewChild('slideWithNav2') slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3') slideWithNav3: IonSlides;
 
  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
 
  deals=[]
  user:any ={}
  finaldt:any;
  datareceive:String="";
  final:any;
fdata: any;
  data: any;
  deals1=[]
  topdata1=[]
  topdata=[]
  cart=[]
  addtocart1=[]
  Integer:any
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };
 
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRouter:ActivatedRoute,
    private http: HttpClient,

  ) {

   


    //Item object for Nature
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: '../../assets/img/1.png'
          },
          {
            id: 2,
            image: '../../assets/img/2.png'
          },
          {
            id: 3,
            image: '../../assets/img/3.png'
          },
          {
            id: 4,
            image: '../../assets/img/4.png'
          },
          {
            id: 5,
            image: '../../assets/img/5.png'
          }
        ]
      };
    //Item object for Food
    this.sliderTwo =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 6,
            image: '../../assets/img/jwl3.png'
          },
          {
            id: 7,
            image: '../../assets/img/jwl4.png'
          },
          {
            id: 8,
            image: '../../assets/img/jwl5.png'
          },
          {
            id: 9,
            image: '../../assets/img/kid.png'
          },
          {
            id: 10,
            image: '../../assets/img/kid1.png'
          }
        ]
      };
    //Item object for Fashion
    this.sliderThree =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 11,
            image: '../../assets/img/jwl1.png'
          },
          {
            id: 12,
            image: '../../assets/img/jwl5.png'
          },
          {
            id: 13,
            image: '../../assets/img/jwl4.png'
          },
          {
            id: 14,
            image: '../../assets/img/purse.png'
          },
          {
            id: 15,
            image: '../../assets/img/kid.png'
          }
        ]
      };
  }

  ngOnInit() {
    const orderdetails = localStorage.getItem('orderdetails');
    this.fdata = JSON.parse(orderdetails)

    console.log("gh",JSON.parse(orderdetails))
    this.activatedRouter.queryParams.subscribe((data)=>{
        // this.finaldt = data;
        //  this.datareceive =JSON.stringify(data);
        //  this.finaldt=data
        //  this.final= JSON.parse(this.finaldt.data);
    //  console.log("product1",Object.values(this.final.label))
        // console.log("addtocart",this.final)
    })

    this.addtocart();
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
  search(){
    this.navCtrl.navigateRoot('/search');
  }
  orderdateails() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','placeOrder');
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
  wishlistbtn(){
    this.navCtrl.navigateRoot('/wishlist');
  }
  wishlist(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addtowishlist');
    formdata.append('_session',session);
    formdata.append('record',id);
    formdata.append('module',"Products");
    formdata.append('value',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("dealslist1",this.data.result.products);
      this.navCtrl.navigateRoot('/wishlist');
      return this.topdata1;

    })
    .catch(console.log);


  }
  addtocart() {
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

  removeaddtocart(id) {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','removeProductFromCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    // formdata.append('qty',"1");


    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("cartdataaa",this.data.result.products);
      // this.navCtrl.navigateRoot('/cart');
      this.addtocart()
      return this.topdata1;

    })
    .catch(console.log);


  } 


  qtyin(id){
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addToCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    formdata.append('action',"increase");
    formdata.append('qty',this.user.cartqty);
 



    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("quantity",this.data.result.quantity);
      // this.navCtrl.navigateRoot('/cart');
      this.addtocart()
      return this.deals1;

    })
    .catch(console.log);
  }


  qtyde(id){
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');

    var formdata = new FormData();
    formdata.append('_operation','addToCart');
    formdata.append('_session',session);
    formdata.append('productId',id);
    formdata.append('userId',userid);
    formdata.append('action',"decrease");
    formdata.append('qty',this.user.cartqty);
 



    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.deals1 =this.data.result.products
      console.log("cartdataaa",this.data.result.products);
      // this.navCtrl.navigateRoot('/cart');
      this.addtocart()
      return this.topdata1;

    })
    .catch(console.log);
  }



  placeorder(){
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  const userid = localStorage.getItem('userid');
  const orderdetails = localStorage.getItem('orderdetails');

  var formdata = new FormData();
  formdata.append('_operation','placeOrder');
  formdata.append('_session',session);
  
  // formdata.append('module','SalesOrder');
  // formdata.append('values',"this.cart");
 
  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    this.topdata1 =this.data.result.products
    console.log("plaace",this.data.result);
    this.navCtrl.navigateRoot('/order');
    this.addtocart()
    return this.topdata1;

  })
  .catch(console.log);
}
  async removeItem() {
    const alert = await this.alertCtrl.create({
      header: 'Item remove',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                //showCloseButton: true,
                message: 'Item removed successfully .',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
              this.navCtrl.navigateForward('/home');
            });
          }
        }
      ]
    });

    await alert.present();
  }
 
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
 
  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }
 
  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
 
  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
 
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
 
}















// import { CartService } from './../cart.service';
// import { Component, OnInit } from '@angular/core';
 
// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.page.html',
//   styleUrls: ['./cart.page.scss'],
// })
// export class CartPage implements OnInit {
 
//   selectedItems = [];
 
//   total = 0;
 
//   constructor(private cartService: CartService) { }
 
//   ngOnInit() {
//     let items = this.cartService.getCart();
//     let selected = {};
//     for (let obj of items) {
//       if (selected[obj.id]) {
//         selected[obj.id].count++;
//       } else {
//         selected[obj.id] = {...obj, count: 1};
//       }
//     }
//     this.selectedItems = Object.keys(selected).map(key => selected[key])
//     this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
//   }
 
// }

