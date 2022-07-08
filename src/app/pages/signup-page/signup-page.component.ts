import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { Company } from '../../employee';

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

  constructor(private data: DataService, private resource: ResourceService, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
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
    }
    const company: Company = {
      id: null,
      companyName: this.companyName,
      companyPassword: this.passwordOne,
      maxManagers: this.numberOfManagers,
      creationDate: '',
      companyEmail: this.companyEmail,
      managers: [],
      companyLastLogin: null
    }
    this.data.addCompany(company, this.resource).subscribe(() =>
      this.resource.getCompany().subscribe({
        next: (company) => (this.data.changeCompany(company)),
        error: () => this.failedLogin(),
        complete: () => this.successfulLogin()
      })
    );
     
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
