import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
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
  data: any;
  topdata1=[]
  orderlistdata=[]
  orderid:any
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
    this.orderlist()
  }
  orderlist(){
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
    const orderdetails = localStorage.getItem('orderdetails');
  
    var formdata = new FormData();
    formdata.append('_operation','getOrderListing');
    formdata.append('_session',session);
    
    formdata.append('userId',userid);
    // formdata.append('values',"this.cart");
   
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      this.orderlistdata =this.data.result.orders
      this.orderid =this.data.result.orders
      console.log("orderlist",this.data.result.orders);
     
      // this.addtocart()
      return this.orderlistdata;
  
    })
    .catch(console.log);
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
