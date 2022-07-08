import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/employee';
import { DataService } from 'src/app/services/data.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manager-greeting',
  templateUrl: './manager-greeting.component.html',
  styleUrls: ['./manager-greeting.component.css']
})
export class ManagerGreetingComponent implements OnInit {
  
  manager!: Manager;
  faTimes = faTimes;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

}
