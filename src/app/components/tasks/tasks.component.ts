import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/json-objects';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleTask: EventEmitter<Task> = new EventEmitter();
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Input() tasks!: Task[] | undefined;
  notSelected: boolean = true;
  employeeId!: number;

  constructor() { }

  ngOnInit(): void {
    
  }

  deleteTask(task: Task) {
    this.onDeleteTask.emit(task);
  }

  addTask(newTask: Task) {
    this.onAddTask.emit(newTask);
  }

  toggleTask(task: Task) {
    this.onToggleTask.emit(task);
  }

}