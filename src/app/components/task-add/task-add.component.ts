import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Manager, Task, Recipient } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  // frequencies!: Frequency[];
  taskName!: string | null;
  taskDescription!: string | null;
  taskNotifyTime!: string | null; 
  taskStartTime!: string | null; 
  taskEndTime!: string | null;
  taskDate!: string | null;
  hasAddress: boolean = false;
  hasAppointment: boolean = false;
  selectedRecipientId!: number;
  taskStreet!: string | null;
  taskCity!: string | null;
  taskState!: string | null;
  taskZipCode!: string | null;
  // selectedFrequency!: number;
  showAddTask: boolean | undefined = true;
  subscription: Subscription | undefined;
  manager!: Manager;

  stageNotification: boolean = true;
  saveNotification: boolean = false;
  generatedMessage: string = "";

  constructor(private resourceService: ResourceService, private uiService: UiService, private data: DataService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentManager.subscribe(manager => this.manager = manager);
    // this.resourceService.getFrequencies().subscribe((frequencies) => (this.frequencies = frequencies));
    this.subscription = this.uiService.onRightTopSubjectToggle().subscribe(value => this.showAddTask = value);
  }

  stagingNotification() {
    if(!this.verifyInputFields()) {
      return;
    }
    const hour = parseInt(this.taskNotifyTime?.substring(0, 2)!, 10);
    var greeting = "";
    if(hour >= 17) { // Good evening
      greeting = "Good evening, "
    } else if(hour >= 12) { // good afternoon
      greeting = "Good afternoon, "
    } else if(hour >= 0) { // good morning
      greeting = "Good morning, "
    }
    var name = "";
    for (var i = 0; i < this.manager.recipients!.length; i++) {
      if(this.manager.recipients![i].recipientId?.valueOf() == this.selectedRecipientId) {
        name = this.manager.recipients![i].recipientFirstName + " " + this.manager.recipients![i].recipientFirstName + ".\n";
      }
    }
    var body = "In regards to "+ this.taskName +", please " + this.taskDescription + ".";
    if(this.hasAppointment) {
      body += "\nSchedule: " + this.taskStartTime + "-" + this.taskEndTime+ ".";
    }
    if(this.hasAddress) {
      body += "\nAddress: " + this.taskStreet + ", " + this.taskCity + ", " + this.taskState + " " + this.taskZipCode + ".";
    }
    this.generatedMessage = greeting + name + body;
    this.saveNotification = true;
  }
  
  verifyInputFields() {
    if(!this.taskName) {
      alert('Please enter a task name!');
      return false;
    }
    if(!this.taskDescription) {
      alert('Please enter a task description!');
      return false;
    }
    if(!this.taskNotifyTime) {
      alert('Please enter a task notification time!');
      return false;
    }
    if(this.generatedMessage.length >= 150) {
      alert('Your message length exceeds the 150 character limit. Please decrease the size of your message.');
      return false;
    }
    if(this.hasAppointment) { // If schedule box is checked this will be true. 
      if(!this.taskStartTime) {
        alert('Please enter a task begin time!');
        return false;
      }
      if(!this.taskEndTime) {
        alert('Please enter a task end time!');
        return false;
      }
    } else {
      this.taskStartTime = null;
      this.taskEndTime = null;
    }

    if(this.hasAddress) { // If address is checked this will be true. 
      if(!this.taskStreet) {
        alert('Please enter a street address!');
        return false;
      }
      if(!this.taskCity) {
        alert('Please enter a city');
        return false;
      }
      if(!this.taskState) {
        alert('Please enter a state!');
        return false;
      }
      if(!this.taskZipCode) {
        alert('Please enter a zip code!');
        return false;
      }
    } else {
      this.taskStreet = null;
      this.taskCity = null;
      this.taskState = null;
      this.taskZipCode = null;
    }
    return true;
  }

  onSubmit() {
    if(!this.verifyInputFields()) {
      return;
    }
    const newTask: Task = {
      taskSelected: false,
      taskDateUpdated: false,
      taskNotifyTime: this.taskNotifyTime,
      taskStartTime: this.taskStartTime,
      taskEndTime: this.taskEndTime,
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskStreet: this.taskStreet,
      taskCity: this.taskCity,
      taskState: this.taskState,
      taskZipCode: this.taskZipCode,
      taskMessage: this.generatedMessage,
      notifyDate: this.taskDate,
      notifyFrequency: "ONCE",
      taskSent: false,
      recipient: {
        recipientId: this.selectedRecipientId
      },
    }
    if(!this.data.notificationIsInPast(newTask)) { // THIS METHOD NEEDS WORK IT DOESNT CALCULATE TIME RIGHT
      alert('Please select a notification time that is after ' + this.data.getMinTime() + ".");
      return;
    }
    this.data.addTask(newTask, this.manager, this.resourceService, this.uiService);

    this.resetAddTaskForm();
    this.uiService.clearUI();
    this.route.navigate(['/home/']);
  }

  getMinDate(): string { 
   return this.data.getMinDate();
  }

  getMaxDate(): string {
    return this.data.getMaxDate();
  }

  private resetAddTaskForm() {
    this.taskName = null;
    this.taskDescription = null;
    this.hasAppointment = false;
    this.taskStartTime = null;
    this.taskEndTime = null;
    this.hasAddress = false;
    this.taskStreet = null;
    this.taskCity = null;
    this.taskState = null;
    this.taskZipCode = null;
  }

}
