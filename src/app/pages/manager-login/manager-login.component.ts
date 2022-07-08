import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manager } from 'src/app/employee';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  private manager!: Manager;
  email!: string;
  password!: string;
  
  constructor(private data: DataService, private resource: ResourceService, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

  onSubmit() {
    if(!this.email) {
      alert('Please your account email!');
      return;
    }
    if(!this.password) {
      alert('Please enter your password!');
      return;
    } 
    this.data.beginLogin(this.email, this.password, this.resource).subscribe({
      next: (manager) => (this.data.changeManager(manager)),
      error: () => this.failedLogin(),
      complete: () => this.verifyLogin()
    }); 
  }

  private failedLogin() {
    this.auth.authenticationFailed();
    alert('Login attempt failed. Please verify your login credentials.');
    this.email = '';
    this.password = '';
    return;
  }

  private successfulLogin() {
    this.auth.authenticationSuccess();
    this.route.navigate(['/home/']);
  }

  private verifyLogin() {
    if(this.manager.id != null) {
      this.successfulLogin();
    } else {
      this.failedLogin();
    }
  }

}
