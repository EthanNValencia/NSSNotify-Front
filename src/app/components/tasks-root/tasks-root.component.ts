import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, takeLast } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';
import { Manager, Recipient, Task } from 'src/app/json-objects';

@Component({
  selector: 'app-tasks-root',
  templateUrl: './tasks-root.component.html',
  styleUrls: ['./tasks-root.component.css']
})
export class TasksRootComponent implements OnInit {

  slimUI!: boolean;
  subscription: Subscription | undefined;
  recipient!: Recipient;
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
    for(var i = 0; i < this.manager.recipients!.length; i++) {
      for(var j = 0; j < this.manager.recipients![i].tasks!.length; j++) {
        if(this.manager.recipients![i].tasks![j].taskId === task.taskId) {
          this.manager.recipients![i].tasks!.splice(j, 1);
        }
        if(this.manager.recipients![i].tasks!.length === 0) {
          this.manager.recipients![i].recipientHasDailyTask = false;
        }
      }
    }
    this.resourceService.deleteTask(task).subscribe(() => this.uiService.rightSlimUICheckTasks(this.tasks!)); // () => (this.tasks = this.tasks!.filter(t => t.id !== task.id))
  }

  toggleTask(task: Task) {
    for(var i = 0; i < this.manager.recipients!.length; i++) {
      for(var j = 0; j < this.manager.recipients![i].tasks!.length; j++) {
        if(this.manager.recipients![i].tasks![j].taskId == task.taskId) {
          this.manager.recipients![i].tasks![j].taskSelected = !this.manager.recipients![i].tasks![j].taskSelected;
        } else {
          this.manager.recipients![i].tasks![j].taskSelected = false;
        }
      }
    }
    this.data.changeTask(task);
    // console.log(task);
  }

}
