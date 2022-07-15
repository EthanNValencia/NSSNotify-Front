import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Manager, Recipient } from 'src/app/json-objects';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {
  @Input() recipient!: Recipient;
  @Output() onDeleteRecipient: EventEmitter<Recipient> = new EventEmitter();
  @Output() onToggleSet: EventEmitter<Recipient> = new EventEmitter();
  slimUI!: boolean;
  manager!: Manager;
  subscription: Subscription | undefined;
  showEditRecipient: boolean = false;
  dailyTask: boolean = false;
  selected: boolean = false;
  faTimes = faTimes;

  constructor(private data: DataService, private uiService: UiService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.uiService.onLeftEditSubjectToggle().subscribe(value => this.showEditRecipient = value);
    this.data.currentManager.subscribe(manager => this.manager = manager);
    this.subscription.add(this.uiService.onLeftSlimUICheckToggle().subscribe(value => this.slimUI = value))
    this.uiService.leftSlimUICheckManager(this.manager);
    // this.checkSlimUI(); 
  }

  getBtnText(): string {
    if(this.showEditRecipient) {
      return "Close";
    }
    return "Edit";
  }

  deleteRecipient(employee: Recipient) {
    this.onDeleteRecipient.emit(employee);
  }

  onToggle(recipient: Recipient) {
    if(this.showEditRecipient == true){
      this.toggleEditButton();
      this.router.navigate([this.getRouterLink()]);
    }
    this.selected = !this.selected;
    this.onToggleSet.emit(recipient);
    this.uiService.rightSlimUICheckTasks(recipient.tasks!);
    // console.log(this.data.selectedEmployeeId); 
  }

  toggleEditButton() {
    this.uiService.toggleLeftEdit();
    this.data.changeEmployeeEdit(this.recipient);
    // console.log(this.showEditEmployee);
  }

  toggleSaveButton() {
    // console.log('Save button clicked.');
  }

  getRouterLink(): string {
    if(this.showEditRecipient) {
      return "editemployee";
    }
    return "/home/";
  }
}
