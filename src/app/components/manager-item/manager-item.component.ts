import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Company, Manager } from 'src/app/employee';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-item',
  templateUrl: './manager-item.component.html',
  styleUrls: ['./manager-item.component.css']
})
export class ManagerItemComponent implements OnInit {
  @Input() manager!: Manager;
  @Output() onSendEmailCreds: EventEmitter<Manager> = new EventEmitter();
  @Output() onDelete: EventEmitter<Manager> = new EventEmitter();
  @Output() onToggleSet: EventEmitter<Manager> = new EventEmitter();
  subscription: Subscription | undefined;
  showEditManager: boolean = false;
  sentEmailSelected: boolean = false;
  faTimes = faTimes;

  constructor(private uiService: UiService, private data: DataService, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.uiService.onLeftEditSubjectToggle().subscribe(value => this.showEditManager = value);
  }

  onToggle(manager: Manager) {
    if(this.showEditManager == true){
      this.toggleEditButton();
      this.route.navigate([this.getRouterLink()]);
    }
    this.onToggleSet.emit(manager);
  }

  deleteManager(manager: Manager) {
    this.onDelete.emit(manager);
  }

  getBtnText(): string {
    if(this.showEditManager) {
      return "Close";
    }
    return "Edit";
  }

  toggleEditButton() {
    this.uiService.toggleLeftEdit();
    this.data.changeManager(this.manager);
  }

  getRouterLink(): string {
    if(this.showEditManager) {
      return "editmanager";
    }
    return "/companyhome/";
  }

  sentEmailBtnText() {
    if(this.sentEmailSelected) {
      return "Credentials Sent";
    }
    return "Email Credentials";
  }

  toggleSendEmailButton() {
    this.onSendEmailCreds.emit(this.manager);
    this.sentEmailSelected = true;
  }

}
