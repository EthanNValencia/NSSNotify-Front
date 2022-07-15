import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Manager, Recipient } from 'src/app/json-objects';
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
  recipientFirstName!: string;
  recipientLastName!: string;
  recipientPhone!: string;
  recipientEmail!: string;
  showAddRecipient: boolean | undefined = true;
  subscription: Subscription | undefined;
  
  constructor(private uiService: UiService, private data: DataService, private resourceService: ResourceService, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.uiService.onLeftTopSubjectToggle().subscribe(value => this.showAddRecipient = value);
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

  clearForm() {
    this.recipientFirstName = '';
    this.recipientLastName = '';
    this.recipientPhone = '';
    this.recipientEmail = '';
  }

  onSubmit() {
    if(this.manager.recipients?.length == this.manager.maxRecipients) {
      alert('You have reached the maximum number of recipients.');
      return; 
    }
    if(!this.recipientFirstName) {
      alert('Please enter the first name!');
      return;
    }
    if(!this.recipientLastName) {
      alert('Please enter the last name!');
      return;
    }
    if(!this.recipientPhone) {
      alert('Please enter a phone number!');
      return;
    }
    if(!this.recipientEmail) {
      alert('Please enter an email address!');
      return;
    }
    if(!this.data.checkPhoneNumber(this.recipientPhone)) {
      alert('Phone numbers should be in the following format: + the 1-digit country code, a 3-digit area code and a 7-digit telephone number.\nExample of a valid phone number: +14073003000')
      return;
    }
    var manager: Manager = {
      managerId: this.manager.managerId
    }
    const recipient: Recipient = {
      recipientId: null,
      recipientSelected: false,
      recipientFirstName: this.recipientFirstName,
      recipientLastName: this.recipientLastName,
      recipientLastMessage: null,
      recipientPhone: this.recipientPhone,
      recipientEmail: this.recipientEmail,
      recipientHasDailyTask: false,
      tasks: [],
      manager: manager
    }
    this.data.addRecipient(recipient, this.manager, this.resourceService);
    // this.resourceService.addEmployee(newEmployee).subscribe(() => (this.manager.employees?.push(newEmployee)));
    this.uiService.clearUI();
    this.route.navigate(['/home/']);
  }
  
}