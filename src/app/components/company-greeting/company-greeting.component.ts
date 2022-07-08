import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/employee';
import { DataService } from 'src/app/services/data.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-greeting',
  templateUrl: './company-greeting.component.html',
  styleUrls: ['./company-greeting.component.css']
})
export class CompanyGreetingComponent implements OnInit {

  company!: Company;
  faTimes = faTimes;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentCompany.subscribe(company => this.company = company);
  }

}
