import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, Manager } from 'src/app/employee';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  showEditEmployee: boolean = true;
  employeeEdit!: Employee;
  manager!: Manager;
  
  constructor(private uiService: UiService, private data: DataService, private resourceService: ResourceService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentEmployeeEdit.subscribe(currentEmployeeEdit => this.employeeEdit = currentEmployeeEdit);
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

  onSubmit() { // This fires when the Update Employee button is clicked. 
    if(!this.employeeEdit.employeeFirstName) {
      alert('Please enter the first name!');
      return;
    }
    if(!this.employeeEdit.employeeLastName) {
      alert('Please enter the last name!');
      return;
    }
    if(!this.employeeEdit.employeePhone) {
      alert('Please enter a phone number!');
      return;
    }
    if(!this.employeeEdit.employeeEmail) {
      alert('Please enter an email address!');
      return;
    }
    if(!this.data.checkPhoneNumber(this.employeeEdit.employeePhone)) {
      alert('Phone numbers should be in the following format: + the 1-digit country code, a 3-digit area code and a 7-digit telephone number.\nExample of a valid phone number: +14073003000')
      return;
    }

    const editEmployee: Employee = {
      id: this.employeeEdit.id,
      employeeSelected: false,
      employeeFirstName: this.employeeEdit.employeeFirstName,
      employeeLastName: this.employeeEdit.employeeLastName,
      employeePhone: this.employeeEdit.employeePhone,
      employeeEmail: this.employeeEdit.employeeEmail,
      employeeLastMessage: null,
      employeeHasDailyTask: this.employeeEdit.employeeHasDailyTask,
      tasks: this.employeeEdit.tasks,
      manager: this.manager
    }
    this.data.changeEmployeeEdit(editEmployee);
    this.resourceService.updateEmployee(editEmployee).subscribe();

    this.uiService.clearUI();
    this.route.navigate(['/home/']);
  }

}


/*
routerLink="/"
*/