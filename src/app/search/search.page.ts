import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {SignupService} from '../services/signup.service'
import { ToastService } from '../services/toast.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  userlog:any ={}
  data: any;
  VtCustProductCategory:any[];
  ProductSubCategory:any[];
  Products:any[];
  Brands=[];
  fdata=[];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private delarapi:SignupService,
    private toastService: ToastService, 
  ) { }

  ngOnInit() {
  }


  
  search() {
    let url = environment.baseurl
    // const loginData = JSON.parse(localStorage.getItem('logindata'));
    const session = localStorage.getItem('session');
    // console.log("userdata",this.userlog)
    var formdata = new FormData();
    formdata.append('_operation','getGlobalSearch');
    formdata.append('_session',session);
    formdata.append('value',this.userlog.username);
  
    this.http.post( url,formdata,{})
    .toPromise()
    .then(response => {
      this.data = response;
      // this.VtCustProductCategory =this.data.result.VtCustProductCategory
      // this.ProductSubCategory =this.data.result.ProductSubCategory
      // this.Brands =this.data.result.Brands
      this.Products =this.data.result.records
      
      console.log("searchdata",this.data.result.records);

      // this.fdata=this.fdata.concat(this.VtCustProductCategory,this.ProductSubCategory,this.Brands,this.Products)
      // console.log("mydata",this.fdata)
      return this.Products;
  
    })
    .catch(console.log);
  }

}
