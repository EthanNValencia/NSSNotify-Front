import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Task} from '../../task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: Task;
  @Input() tasks!: Task[] | undefined;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleTask: EventEmitter<Task> = new EventEmitter();
  
  slimUI: boolean = false;
  subscription: Subscription | undefined;
  showEditTask: boolean = false;
  faTimes = faTimes;

  constructor(private data: DataService, private uiService: UiService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.uiService.onRightEditSubjectToggle().subscribe(value => this.showEditTask = value);
    this.subscription.add(this.uiService.onRightSlimUICheckToggle().subscribe(value => this.slimUI = value));
    this.uiService.rightSlimUICheckTasks(this.tasks!);

  }

  deleteTask(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleTask.emit(task);
  }

  getRouterLink(): string {
    if(this.showEditTask) {
      return "/home/edittask";
    } 
    return "/home/";
  }

  getBtnText(): string {
    if(this.showEditTask) {
      return "Close";
    }
    return "Edit";
  }

  toggleEditButton() {
    this.uiService.toggleRightEdit();
    this.data.changeTask(this.task);
  }

}
