import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';
import { Manager, Recipient } from 'src/app/json-objects';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  showEditRecipient: boolean = true;
  recipientEdit!: Recipient;
  manager!: Manager;
  
  constructor(private uiService: UiService, private data: DataService, private resourceService: ResourceService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentRecipientEdit.subscribe(currentEmployeeEdit => this.recipientEdit = currentEmployeeEdit);
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

  onSubmit() { // This fires when the Update Employee button is clicked. 
    if(!this.recipientEdit.recipientFirstName) {
      alert('Please enter the first name!');
      return;
    }
    if(!this.recipientEdit.recipientLastName) {
      alert('Please enter the last name!');
      return;
    }
    if(!this.recipientEdit.recipientPhone) {
      alert('Please enter a phone number!');
      return;
    }
    if(!this.recipientEdit.recipientEmail) {
      alert('Please enter an email address!');
      return;
    }
    if(!this.data.checkPhoneNumber(this.recipientEdit.recipientPhone)) {
      alert('Phone numbers should be in the following format: + the 1-digit country code, a 3-digit area code and a 7-digit telephone number.\nExample of a valid phone number: +14073003000')
      return;
    }

    const editEmployee: Recipient = {
      recipientId: this.recipientEdit.recipientId,
      recipientSelected: false,
      recipientFirstName: this.recipientEdit.recipientFirstName,
      recipientLastName: this.recipientEdit.recipientLastName,
      recipientPhone: this.recipientEdit.recipientPhone,
      recipientEmail: this.recipientEdit.recipientEmail,
      recipientLastMessage: null,
      recipientHasDailyTask: this.recipientEdit.recipientHasDailyTask,
      tasks: this.recipientEdit.tasks,
      manager: this.manager
    }
    this.data.changeEmployeeEdit(editEmployee);
    this.resourceService.updateRecipient(editEmployee).subscribe();
    this.uiService.clearUI();
    this.route.navigate(['/home/']);
  }

}


/*
routerLink="/"
*/