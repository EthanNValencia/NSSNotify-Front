import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/json-objects';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  manager!: Manager; 

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentManager.subscribe(manager => this.manager = manager);
  }

}
