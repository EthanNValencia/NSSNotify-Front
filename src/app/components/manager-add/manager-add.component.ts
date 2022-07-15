import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, Manager } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.css']
})
export class ManagerAddComponent implements OnInit {
  /* First Manager Data */
  managerFirstName!: string;
  managerLastName!: string;
  managerEmail!: string;
  managerPhoneNumber!: string;
  numberOfEmployees!: number;
  passwordOne!: string;
  passwordTwo!: string;
  company!: Company;

  constructor(private data: DataService, private resourceService: ResourceService, private route: Router, private uiService: UiService) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
  }

  onSubmit() {
    if(this.company.managers?.length == this.company.maxManagers) {
      alert('You have reached the maximum number of managers.');
      return; 
    }
    if(!this.managerFirstName) {
      alert('Please provide your manager first name.');
      return;
    }
    if(!this.managerLastName) {
      alert('Please provide your manager last name.');
      return;
    }
    if(!this.managerEmail) {
      alert('Please provide your manager email address.');
      return;
    }
    if(!this.managerPhoneNumber) {
      alert('Please provide a phone number for your manager.');
      return;
    }
    if(this.passwordOne !== this.passwordTwo){
      alert('Your passwords do not match.');
      return;
    }
    if(!this.numberOfEmployees) {
      alert('Please select the max number of recipients for your manager.');
      return;
    }
    if(!this.data.checkPhoneNumber(this.managerPhoneNumber)) {
      alert('Phone numbers should be in the following format: + the 1-digit country code, a 3-digit area code and a 7-digit telephone number.\nExample of a valid phone number: +14073003000')
      return;
    }
    if(!this.company.companyEmail == !this.managerEmail) {
      alert('You cannot use your company email address for a manager.')
      return;
    }
    var company: Company = {
      companyId: this.company.companyId
    }
    const manager: Manager = {
      managerId: null,
      managerFirstName: this.managerFirstName,
      managerLastName: this.managerLastName,
      managerPhone: this.managerPhoneNumber,
      managerLastLogin: null,
      managerSelected: false,
      managerEmail: this.managerEmail,
      managerPassword: this.passwordOne,
      maxRecipients: this.numberOfEmployees,
      company: company,
      recipients: []
    }
    this.data.addManager(manager, this.company, this.resourceService);
    this.uiService.clearUI();
    this.route.navigate(['/companyhome/']);
  }

}
