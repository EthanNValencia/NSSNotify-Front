import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { Manager, Recipient } from 'src/app/json-objects';

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
  
  deleteRecipient(recipient: Recipient) {
    this.resourceService.deleteRecipient(recipient).subscribe(() => (this.manager.recipients = this.manager.recipients!.filter(e => e.recipientId !== recipient.recipientId), this.uiService.leftSlimUICheckManager(this.manager)));
    // this.uiService.leftSlimUICheck(this.manager);
  }

  toggle(recipient: Recipient) {
    if(this.employeeToggled === false) { // Hasn't been selected before. 
      this.employeeToggled = true;
      recipient.recipientSelected = !recipient.recipientSelected;
      this.data.changeTasks(recipient.tasks!, recipient);
      this.data.selectedEmployeeId = recipient.recipientId;
    } else if (this.employeeToggled === true) { // This is reached when switching from a selected item to another selected item.
      if(recipient.recipientSelected === true) {
        recipient.recipientSelected= false;
        this.employeeToggled = false;
        const tasks = this.data.constructInitialTasks();
        this.data.changeTasks(tasks, recipient);
        this.data.selectedEmployeeId = null;
        return;
      } 
      for (var i = 0; i < this.manager.recipients!.length; i++) {
        if(this.manager.recipients![i].recipientSelected) {
          this.manager.recipients![i].recipientSelected = false;
        }
      } 
      this.data.selectedEmployeeId = recipient.recipientId;
      this.employeeToggled = true;
      recipient.recipientSelected = !recipient.recipientSelected;
      this.data.changeTasks(recipient.tasks!, recipient);
    }
  }

}
