import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, Manager } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.css']
})
export class ManagerEditComponent implements OnInit {
  
  manager!: Manager;
  company!: Company;

  constructor(private data: DataService, private resourceService: ResourceService, private route: Router, private uiService: UiService) { }

  ngOnInit(): void {
    this.data.currentManager.subscribe(manager => this.manager = manager);
    this.data.currentCompany.subscribe(company => this.company = company);
  }

  onSubmit() {
    if(!this.manager.managerFirstName) {
      alert('Please enter your manager first name.');
      return;
    }
    if(!this.manager.managerLastName) {
      alert('Please enter your manager last name.');
      return;
    }
    if(!this.manager.managerEmail) {
      alert('Please enter your manager email address.');
      return;
    }
    if(!this.manager.maxRecipients) {
      alert('Please select the max number of recipients for your manager.');
      return;
    }
    console.log(JSON.stringify(this.manager));
    this.data.changeManager(this.manager);
    this.resourceService.updateManager(this.manager).subscribe();
    this.uiService.clearUI();
    this.route.navigate(['/companyhome/']);
  }

}
