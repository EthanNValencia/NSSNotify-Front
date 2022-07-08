import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private managerCredsValidated: boolean = false;
  private companyCredsValidated: boolean = false;

  authenticationSuccess() {
    this.managerCredsValidated = true;
  }

  authenticationFailed() {
    this.managerCredsValidated = false;
  }

  authenticationSuccessCompany() {
    this.companyCredsValidated = true;
  }

  authenticationFailedCompany() {
    this.companyCredsValidated = false;
  }

  authenticateManagerLogin() {
    return this.managerCredsValidated;
  }

  authenticateCompanyLogin() {
    return this.companyCredsValidated;
  }

  constructor() { 
    
  }
}
