import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() btnText!: string;
  @Input() btnColor!: string;
  @Input() btnClick: string | undefined;
  @Input() baseURL!: string;
  showAdd: boolean = false;
  subscription: Subscription | undefined;

  constructor(private uiService: UiService, private router: Router) { }


  getBtnText(): string {
    if(this.showAdd) {
      return "Close";
    } else {
      return this.btnText;
    }
  }

  ngOnInit(): void {
    this.subscription = this.getObservable();
  }

  getObservable(): Subscription {
    if(this.btnClick === 'toggleAddEmployee' || this.btnClick === 'toggleAddManager') {
      return this.uiService.onLeftTopSubjectToggle().subscribe(value => this.showAdd = value);
    } else if(this.btnClick === 'toggleAddTask') {
      return this.uiService.onRightTopSubjectToggle().subscribe(value => this.showAdd = value);
    } 
    return new Subscription();
  }
  
  toggleButton() {
    if(this.btnClick === 'toggleAddEmployee' || this.btnClick === 'toggleAddManager') {
      this.uiService.toggleLeftTop();
    } else if(this.btnClick === 'toggleAddTask') {
      this.uiService.toggleRightTop();
    } 
    // console.log("Here");
  }

  hasRoute(route: string): boolean { // This is used in the header.component.html to determine what page is currently being viewed. 
    return this.router.url === route;
  }

  getRouterLink(): string {
    if(this.btnClick === 'toggleAddEmployee' && this.showAdd) {
      return "/home/addemployee";
    } else if (this.btnClick === 'toggleAddTask' && this.showAdd) {
      return "/home/addtask";
    } else if(this.btnClick === 'toggleAddManager' && this.showAdd) {
      return "/companyhome/addmanager";
    }
    return "/" + this.baseURL + "/";
  }

}
