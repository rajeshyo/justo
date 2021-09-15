import { Component,ViewChild } from '@angular/core';
//import { ModalController } from '@ionic/angular';
//import { ImageModalPage } from '../image-modal/image-modal.page';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IonSlides } from '@ionic/angular';
import {Router} from '@angular/router';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {
  
  cdata= []
  brand=[]
  topdata= []
  deals=[]
  deals1=[]
  filtdt=[]
  data: any;
  userdata:any;
  cart=[]
  topdata1=[]


   images = ['1.png','1.png','1.png'];
   image = ['11c.png','10.png','11f.png'];
   image1 = ['11b.png','11d.png','11a.png'];
   image2 = ['11g.png','11h.png','11g.png'];
   show = true;
   sliderOpts = {
      zoom: true,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20
    };
    @ViewChild('slideWithNav') slideWithNav: IonSlides;
      @ViewChild('slideWithNav2') slideWithNav2: IonSlides;
      @ViewChild('slideWithNav3') slideWithNav3: IonSlides;
     
      sliderOne: any;
      sliderTwo: any;
      sliderThree: any;
     
     
      //Configuration for each Slider
      slideOptsOne = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay:true
      };
      
      slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true
      };
      slideOptsThree = {
        initialSlide: 1,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true

      };
      slideOptsFourth = {
         initialSlide: 1,
         slidesPerView: 3,
         loop: true,
         centeredSlides: true
 
       };
 constructor(  public navCtrl: NavController,  private http: HttpClient,public router:Router){
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
          
        ]
      };
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

@ViewChild('slider') slider: IonSlides;
page = "0";

selectedTab(index) {
   this.slider.slideTo(index);
}

async moveButton() {
   let index = await this.slider.getActiveIndex();
   this.page = index.toString();
} 


ngOnInit() {
  this.productcat();
  this.topproductcat();
  this.dealsoftheday();
  this.dealsoftheday1();
  this.productbrand();
  this.localdata();
  this.addtocart();
  this.getwishlist()
// this.myTimer()
}

//  initTime = new Date();
// i = 0;
//  myTimer() {
//   this.i++;
//     var newTime = new Date(this.initTime.getTime() - this.i * 1000);
// console.log(newTime.toLocaleTimeString());

// }
//  myVar = setInterval(this.myTimer, 1000);


// text:any
// counter = 10;
// interval = setInterval(function() {
//     this.counter--;
//     // Display 'counter' wherever you want to display it.
//     if (this.counter <= 0) {
//      		clearInterval(this.interval);
         
//       	 document.getElementById('#timer')
//         //  .html("<h3>Count down complete</h3>");  
//         return;
//     }else{
//       // document.getElementById('#time').text(this.counter);
//       console.log("Timer --> " + this.counter);
//     }
// }, 1000);




wishlistbtn(){
  this.navCtrl.navigateRoot('/wishlist');
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
search(){
  this.navCtrl.navigateRoot('/search');
}
profileedit(){
  this.navCtrl.navigateRoot('/profile');
}

localdata(){
  const loginData = JSON.parse(localStorage.getItem('logindata'));
  this.userdata=loginData
return this.userdata
}

productcat() {
  let url = environment.baseurl
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const session = localStorage.getItem('session');
  // console.log("userdata",this.userlog)
  var formdata = new FormData();
  formdata.append('_operation','getProductsByCategory');
  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    this.cdata =this.data.result.productCategories
    console.log("productdata",this.data.result.productCategories);
    return this.cdata;
   
  })
  .catch(console.log);
}


topproductcat() {
  let url = environment.baseurl
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const session = localStorage.getItem('session');
  // console.log("userdata",this.userlog)
  var formdata = new FormData();
  formdata.append('_operation','topProductsByCategory');
  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    this.topdata =this.data.result.productCategories
    console.log("topproductdata",this.data.result.productCategories);
  

// for (let i = 0; i < this.topdata.length; i++) {
//   for (let j = 0; j < this.topdata[i].SubCategory.length; j++) {
//     this.filtdt=this.topdata[i].SubCategory[j].id
//   console.log("this  is id",this.filtdt)


//   // this.router.navigate(['gown'],{queryParams:{data:fdata}})
//   }
// }
    return this.topdata;
  })
  .catch(console.log);


}

dealsoftheday() {
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  var formdata = new FormData();
  formdata.append('_operation','getDealsOfTheDay');
  formdata.append('type','Deal Of The Day');

  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    this.deals =this.data.result.banners
    console.log("dealsdata",this.data.result.banners);
  

// for (let i = 0; i < this.topdata.length; i++) {
//   for (let j = 0; j < this.topdata[i].SubCategory.length; j++) {
//     this.filtdt=this.topdata[i].SubCategory[j].id
//   console.log("this  is id",this.filtdt)


//   // this.router.navigate(['gown'],{queryParams:{data:fdata}})
//   }
// }
    return this.topdata;
  })
  .catch(console.log);


}


dealsoftheday1() {
  let url = environment.baseurl
  const session = localStorage.getItem('session');
  var formdata = new FormData();
  formdata.append('_operation','getDealsOfTheDay');
  formdata.append('type','Hyper Deal');

  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    this.deals1 =this.data.result.banners
    console.log("dealsdata1",this.data.result.banners);
  

// for (let i = 0; i < this.topdata.length; i++) {
//   for (let j = 0; j < this.topdata[i].SubCategory.length; j++) {
//     this.filtdt=this.topdata[i].SubCategory[j].id
//   console.log("this  is id",this.filtdt)


//   // this.router.navigate(['gown'],{queryParams:{data:fdata}})
//   }
// }
    return this.topdata;
  })
  .catch(console.log);


}

productbrand() {
  let url = environment.baseurl
  // const loginData = JSON.parse(localStorage.getItem('logindata'));
  const session = localStorage.getItem('session');
  // console.log("userdata",this.userlog)
  var formdata = new FormData();
  formdata.append('_operation','getBrands');
  formdata.append('_session',session);

  this.http.post( url,formdata,{})
  .toPromise()
  .then(response => {
    this.data = response;
    this.brand =this.data.result.records
    console.log("productbrand",this.data.result.records);
    return this.brand;
   
  })
  .catch(console.log);
}
productdata(id){
  this.router.navigate(['gown'],{queryParams:{id:id}})
  console.log("router id",id)
}
}





