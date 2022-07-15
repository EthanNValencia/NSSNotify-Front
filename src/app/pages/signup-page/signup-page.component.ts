import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { Company, Token } from '../../json-objects';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  /* Company Data */
  companyName!: string;
  companyEmail!: string;
  passwordOne!: string;
  passwordTwo!: string;
  numberOfManagers!: number;

  company!: Company;
  token!: Token;

  constructor(private data: DataService, private resource: ResourceService, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
    this.data.currentToken.subscribe(token => this.token = token);
  }

  onSubmit() {
    if(!this.companyEmail) {
      alert('Please your company account email.');
      return;
    }
    if(!this.passwordOne) {
      alert('Please enter your password.');
      return;
    }
    if(!this.passwordTwo) {
      alert('Please retype your password.');
      return;
    }
    if(this.passwordOne !== this.passwordTwo){
      alert('Your passwords do not match.');
      return;
    }
    if(!this.numberOfManagers) {
      alert('You must select a maximum number of managers for your account.');
      return;
    }let newCompany: Company = {
      companyId: null,
      companyName: this.companyName,
      companyPassword: this.passwordOne,
      maxManagers: this.numberOfManagers,
      creationDate: '',
      companyEmail: this.companyEmail,
      managers: [],
      companyLastLogin: null
    }
    console.log(JSON.stringify(newCompany));

    this.data.generateCompanyToken(newCompany, this.resource).subscribe({
      next: (token) => this.data.changeToken(token),
      error: () => this.failedLogin(),
      complete: () => this.data.addCompany(newCompany, this.resource, this.token).subscribe({
        next: (company) => console.log("Returned Company: " + company),
        error: () => this.failedLogin(),
        complete: () => this.data.beginCompanyLogin(newCompany.companyEmail!, newCompany.companyPassword!, this.resource, this.token).subscribe({
          next: (company) => (this.data.changeCompany(company)),
          error: () => this.failedLogin(),
          complete: () => this.successfulLogin()
        })
      })
    });
  }

  private failedLogin() {
    this.auth.authenticationFailedCompany();
    alert('Login attempt failed. Please verify your login credentials.');
    return;
  }

  private successfulLogin() {
    this.auth.authenticationSuccessCompany();
    this.route.navigate(['/companyhome/']);
  }

}



    /*
    this.data.createCompanyToken(newCompany, this.resource).subscribe(
      (token) => this.data.addCompany(newCompany, this.resource, token).subscribe((company) =>
        this.data.beginCompanyLogin(company.companyEmail!, company.companyPassword!, this.resource).subscribe({
          next: (company) => (this.data.changeCompany(company)),
          error: () => this.failedLogin(),
          complete: () => this.successfulLogin()
        })
      )
    ); */
    /*
    this.data.createCompanyToken(newCompany, this.resource).subscribe({
      next: (token) => this.data.addCompany(newCompany, this.resource, token).subscribe({
        next: (company) => this.data.beginCompanyLogin(company.companyEmail!, company.companyPassword!, this.resource).subscribe({
          next: (company) => (this.data.changeCompany(company)),
          error: () => this.failedLogin(),
          complete: () => this.successfulLogin()
        })
      })
    }); */