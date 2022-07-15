import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  company!: Company;

  constructor(private data: DataService, private resource: ResourceService) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
  }

}
