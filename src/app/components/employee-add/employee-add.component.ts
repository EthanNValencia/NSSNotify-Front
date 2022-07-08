import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee, Manager } from 'src/app/employee';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  
  manager!: Manager; 
  employeeFirstName!: string;
  employeeLastName!: string;
  employeePhone!: string;
  employeeEmail!: string;
  showAddEmployee: boolean | undefined = true;
  subscription: Subscription | undefined;
  
  constructor(private uiService: UiService, private data: DataService, private resourceService: ResourceService, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.uiService.onLeftTopSubjectToggle().subscribe(value => this.showAddEmployee = value);
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

  clearForm() {
    this.employeeFirstName = '';
    this.employeeLastName = '';
    this.employeePhone = '';
    this.employeeEmail = '';
  }

  onSubmit() {
    if(this.manager.employees?.length == this.manager.maxEmployees) {
      alert('You have reached the maximum number of recipients.');
      return; 
    }
    if(!this.employeeFirstName) {
      alert('Please enter the first name!');
      return;
    }
    if(!this.employeeLastName) {
      alert('Please enter the last name!');
      return;
    }
    if(!this.employeePhone) {
      alert('Please enter a phone number!');
      return;
    }
    if(!this.employeeEmail) {
      alert('Please enter an email address!');
      return;
    }
    if(!this.data.checkPhoneNumber(this.employeePhone)) {
      alert('Phone numbers should be in the following format: + the 1-digit country code, a 3-digit area code and a 7-digit telephone number.\nExample of a valid phone number: +14073003000')
      return;
    }
    const manager: Manager = {
      id: null,
      managerEmail: '',
      managerSelected: false,
      managerLastLogin: null,
      managerPhone: '',
      managerPassword: '',
      maxEmployees: 0,
      employees: []
    }
    const newEmployee: Employee = {
      id: null,
      employeeSelected: false,
      employeeFirstName: this.employeeFirstName,
      employeeLastName: this.employeeLastName,
      employeeLastMessage: null,
      employeePhone: this.employeePhone,
      employeeEmail: this.employeeEmail,
      employeeHasDailyTask: false,
      tasks: null,
      manager: manager
    }
    this.data.addEmployee(newEmployee, this.resourceService);
    // this.resourceService.addEmployee(newEmployee).subscribe(() => (this.manager.employees?.push(newEmployee)));
    this.uiService.clearUI();
    this.route.navigate(['/home/']);
  }
  
}