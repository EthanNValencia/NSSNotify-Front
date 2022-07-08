import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/employee';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  company!: Company;

  constructor(private data: DataService, private resource: ResourceService, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
  }

  onSubmit() {
    if(!this.company.companyEmail) {
      alert('Please your account email!');
      return;
    }
    if(!this.company.companyPassword) {
      alert('Please enter your password!');
      return;
    } 
    this.data.beginCompanyLogin(this.company.companyEmail, this.company.companyPassword, this.resource).subscribe({
      next: (company) => (this.data.changeCompany(company)),
      error: () => this.failedLogin(),
      complete: () => this.verifyLogin()
    });
  }

  private failedLogin() {
    this.auth.authenticationFailedCompany();
    alert('Login attempt failed. Please verify your login credentials.');
    this.company.companyEmail = '';
    this.company.companyPassword = '';
    return;
  }

  private successfulLogin() {
    this.auth.authenticationSuccessCompany();
    this.route.navigate(['/companyhome/']);
  }

  private verifyLogin() {
    if(this.company.id != null) {
      this.successfulLogin();
    } else {
      this.failedLogin();
    }
  }

}
