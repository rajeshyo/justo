import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
   
    let authInfo = {
      authenticated: false
    };

    if (localStorage.getItem("session") == null) {
      authInfo.authenticated = true;
      this.router.navigate(["signup"]);
      return false;
    }
    if (localStorage.getItem("session") != null) {
      authInfo.authenticated = false;
     
      //this.router.navigate(['dashboard']);

      return true;
    }

    //return true;
  }
}
