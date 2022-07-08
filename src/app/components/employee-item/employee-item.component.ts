import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee, Manager } from '../../employee';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {
  @Input() employee!: Employee;
  @Output() onDeleteEmployee: EventEmitter<Employee> = new EventEmitter();
  @Output() onToggleSet: EventEmitter<Employee> = new EventEmitter();
  slimUI!: boolean;
  manager!: Manager;
  subscription: Subscription | undefined;
  showEditEmployee: boolean = false;
  dailyTask: boolean = false;
  selected: boolean = false;
  faTimes = faTimes;

  constructor(private data: DataService, private uiService: UiService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.uiService.onLeftEditSubjectToggle().subscribe(value => this.showEditEmployee = value);
    this.data.currentManager.subscribe(manager => this.manager = manager);
    this.subscription.add(this.uiService.onLeftSlimUICheckToggle().subscribe(value => this.slimUI = value))
    this.uiService.leftSlimUICheckManager(this.manager);
    // this.checkSlimUI(); 
  }

  getBtnText(): string {
    if(this.showEditEmployee) {
      return "Close";
    }
    return "Edit";
  }

  deleteEmployee(employee: Employee) {
    this.onDeleteEmployee.emit(employee);
  }

  onToggle(employee: Employee) {
    if(this.showEditEmployee == true){
      this.toggleEditButton();
      this.router.navigate([this.getRouterLink()]);
    }
    this.selected = !this.selected;
    this.onToggleSet.emit(employee);
    this.uiService.rightSlimUICheckTasks(employee.tasks!);
    // console.log(this.data.selectedEmployeeId); 
  }

  toggleEditButton() {
    this.uiService.toggleLeftEdit();
    this.data.changeEmployeeEdit(this.employee);
    // console.log(this.showEditEmployee);
  }

  toggleSaveButton() {
    // console.log('Save button clicked.');
  }

  getRouterLink(): string {
    if(this.showEditEmployee) {
      return "editemployee";
    }
    return "/home/";
  }
}
