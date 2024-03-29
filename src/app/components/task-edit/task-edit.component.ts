import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manager, Recipient, Task } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  currentTask!: Task;
  taskDate!: string;
  manager!: Manager;
  recipient!: Recipient;

  constructor(private uiService: UiService, private data: DataService, private resourceService: ResourceService, private route: Router) { }

  ngOnInit(): void {
    this.data.currentTaskEdit.subscribe(task => this.currentTask = task);
    this.taskDate = this.currentTask.notifyDate!;
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

  getMinDate(): string { 
    return this.data.getMinDate();
   }
 
   getMaxDate(): string {
     return this.data.getMaxDate();
   }

  onSubmit() {
    if(!this.data.notificationIsInPast(this.currentTask)) {
      alert('Please select a notification time that is after ' + this.data.getMinTime() + ".");
      return;
    }
    if(this.taskDate !== this.currentTask.notifyDate) {
      this.currentTask.taskDateUpdated = true;
    } else {
      this.currentTask.taskDateUpdated = false;
    }
    
    this.currentTask.taskSelected = false;
    this.data.changeTask(this.currentTask);
    this.resourceService.updateTask(this.currentTask).subscribe(() => this.resourceService.getManager(this.manager).subscribe((manager) => (this.data.changeManager(manager))));
    this.uiService.clearUI();
    this.route.navigate(['/home/']);
  }

}