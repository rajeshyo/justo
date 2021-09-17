import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, IonInfiniteScroll,
  IonContent,MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  data: any;
  topdata1=[]
  orderlistdata=[]
  orderid:any
  page:any;
  filterid:any;
  Error_message: string = "";
  totalrecords: number = 0;
  scrollTopButton = false;
  limit:any;
  disable = 0;
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private toastService: ToastService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRouter:ActivatedRoute,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.page =1;
    this.limit =10;
    this.orderlist()
  }

  async orderlist(event?){

    if (this.page == 1) {
      this.orderlistdata = [];
    }
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
  
    loader.present();
  
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
  
    var formdata = new FormData();
    formdata.append('_operation','getOrderListing');
    formdata.append('_session',session);
    formdata.append('userId',userid);
    formdata.append('maxEntries',this.limit);
    formdata.append('page',this.page);
    // formdata.append('values',"this.cart");
   
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      loader.dismiss();
      this.data = response;

    
      if( this.data.result.orders == null || this.data.result.orders == 'null' || this.data.result.orders == '') {

        this.Error_message = 'No any data found.';
        this.totalrecords=0;

      }else { 
          let pdata = this.data.result.orders;

          if (this.page == 1) {
            this.orderlistdata = new Array();
            this.scrollToTop();
           // this.infiniteScroll.disabled = false;
          }
          if (pdata.length != 0) {

            for (let value of pdata) {
              this.orderlistdata.push(value);
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

      console.log("orderlistdata",this.orderlistdata);

      //this.orderlistdata =this.data.result.orders
    //  this.orderid =this.data.result.orders
     
      // this.addtocart()  return this.orderlistdata;
  
    })
    .catch(console.log);
  }
  scrollToTop() {
    this.content.scrollToTop(0);
    this.scrollTopButton = false;
  }
  
  cancelorder(id){
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
  
    var formdata = new FormData();
    formdata.append('_operation','cancelOrder');
    formdata.append('_session',session);
    
    formdata.append('userId',userid);
    formdata.append('sostatus',"Cancelled");
    formdata.append('module', 'SalesOrder');
    formdata.append('action', 'SaveAjax');
    formdata.append('orderId', id );
   
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.topdata1 =this.data.result.orders;
      this.orderlist();
      this.toastService.presentToast('Cancel Sucessfull');
      console.log("orderlist",this.data.result.orders);
      // return this.topdata1;
  
    })
    .catch(console.log);
  }
}
