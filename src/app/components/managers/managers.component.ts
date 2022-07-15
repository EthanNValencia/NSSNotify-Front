import { Component, OnInit } from '@angular/core';
import { Company, Manager } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  company!: Company;

  constructor(private data: DataService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
  }

  deleteManager(manager: Manager) {
    this.data.deleteManager(manager.managerId!, this.company, this.resourceService);
  }

  sendEmail(manager: Manager) {
    this.resourceService.notifyManager(manager).subscribe();
  }

  toggle(manager: Manager) {
    for(var i = 0; i < this.company.managers!.length; i++) {
      if(this.company.managers![i].managerId !== manager.managerId) {
        this.company.managers![i].managerSelected = false;
      } else {
        this.company.managers![i].managerSelected = !this.company.managers![i].managerSelected;
      }
    }
  }
}
