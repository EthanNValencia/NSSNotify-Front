import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, takeLast } from 'rxjs';
import { Employee, Manager } from 'src/app/employee';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';
import {Task} from '../../task';

@Component({
  selector: 'app-tasks-root',
  templateUrl: './tasks-root.component.html',
  styleUrls: ['./tasks-root.component.css']
})
export class TasksRootComponent implements OnInit {

  slimUI!: boolean;
  subscription: Subscription | undefined;
  employee!: Employee;
  manager!: Manager; // This is global data. 
  tasks: Task[] | undefined; // This is the tasks of the selected employee

  constructor(private resourceService: ResourceService, private data: DataService, private uiService: UiService) { }

  ngOnInit(): void {
    this.data.currentTasks.subscribe(tasks => this.tasks = tasks);
    this.data.currentManager.subscribe(manager => this.manager = manager);
    this.subscription = this.uiService.onRightSlimUICheckToggle().subscribe(value => this.slimUI = value);
    this.uiService.rightSlimUICheckTasks(this.tasks!);
  }

  deleteTask(task: Task) {
    for(var i = 0; i < this.manager.employees!.length; i++) {
      for(var j = 0; j < this.manager.employees![i].tasks!.length; j++) {
        if(this.manager.employees![i].tasks![j].id === task.id) {
          this.manager.employees![i].tasks!.splice(j, 1);
        }
        if(this.manager.employees![i].tasks!.length === 0) {
          this.manager.employees![i].employeeHasDailyTask = false;
        }
      }
    }
    this.resourceService.deleteTask(task).subscribe(() => this.uiService.rightSlimUICheckTasks(this.tasks!)); // () => (this.tasks = this.tasks!.filter(t => t.id !== task.id))
  }

  toggleTask(task: Task) {
    for(var i = 0; i < this.manager.employees!.length; i++) {
      for(var j = 0; j < this.manager.employees![i].tasks!.length; j++) {
        if(this.manager.employees![i].tasks![j].id == task.id) {
          this.manager.employees![i].tasks![j].taskSelected = !this.manager.employees![i].tasks![j].taskSelected;
        } else {
          this.manager.employees![i].tasks![j].taskSelected = false;
        }
      }
    }
    this.data.changeTask(task);
    // console.log(task);
  }

}
