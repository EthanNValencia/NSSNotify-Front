import { Component, OnInit } from '@angular/core';
import {Employee, Manager} from '../../employee';
import {ResourceService} from '../../services/resource.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  manager!: Manager;
  employeeToggled: boolean = false;
  
  constructor(private resourceService: ResourceService, private data: DataService, private uiService: UiService) { }

  ngOnInit(): void {
    this.data.currentManager.subscribe(manager => this.manager = manager);
    // this.resourceService.getManager().subscribe((manager) => (this.setManager(manager)));
  }

  setManager(manager: Manager) {
    this.data.changeManager(manager);
  }
  
  deleteEmployee(employee: Employee) {
    this.resourceService.deleteEmployee(employee).subscribe(() => (this.manager.employees = this.manager.employees!.filter(e => e.id !== employee.id), this.uiService.leftSlimUICheckManager(this.manager)));
    // this.uiService.leftSlimUICheck(this.manager);
  }

  toggle(employee: Employee) {
    if(this.employeeToggled === false) { // Hasn't been selected before. 
      this.employeeToggled = true;
      employee.employeeSelected = !employee.employeeSelected;
      this.data.changeTasks(employee.tasks!, employee);
      this.data.selectedEmployeeId = employee.id;
    } else if (this.employeeToggled === true) { // This is reached when switching from a selected item to another selected item.
      if(employee.employeeSelected === true) {
        employee.employeeSelected = false;
        this.employeeToggled = false;
        const tasks = this.data.constructInitialTasks();
        this.data.changeTasks(tasks, employee);
        this.data.selectedEmployeeId = null;
        return;
      } 
      for (var i = 0; i < this.manager.employees!.length; i++) {
        if(this.manager.employees![i].employeeSelected) {
          this.manager.employees![i].employeeSelected = false;
        }
      } 
      this.data.selectedEmployeeId = employee.id;
      this.employeeToggled = true;
      employee.employeeSelected = !employee.employeeSelected;
      this.data.changeTasks(employee.tasks!, employee);
    }
  }

}
