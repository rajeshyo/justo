import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {
 
  Router
} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data: any;
  validUser = false;

  constructor(   private http: HttpClient,private router: Router
    ) {

     // this.checkUser();
     }
     logout() {
      console.log('localStorage clear'); 
      localStorage.clear();
  
      this.router.navigateByUrl("/signup");  
  }
  getToken() {
   //console.log('checkUser',this.checkUser()); 
  
  	return !!localStorage.getItem('session')
  } 

  checkUser() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');
  

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

      console.log('check user', response);
   if( this.data.success == true){
     this.validUser = true;
   }else{
    this.validUser = false;
  }
     

    })
    .catch(console.log);

  } 
}
