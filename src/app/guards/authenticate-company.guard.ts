import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ResourceService } from '../services/resource.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateCompanyGuard implements CanActivate {
  
  constructor(private auth: AuthService, private data: DataService, private resource: ResourceService, private route: Router) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.authenticateCompanyLogin()) {
      return true;
    } else {
      this.route.navigate(['/companylogin/']);
      return false;
    }
  }
  
}
