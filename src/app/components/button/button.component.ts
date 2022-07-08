import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() color!: string;
  @Input() canDisable: boolean = false;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void { 
    
  }

  clickMethod($event: MouseEvent) {
    if(this.canDisable) {
      this.disableButtonActionMethod($event);
    } else {
      this.onClick();
    }
  }

  onClick() {
    this.btnClick.emit();
  }

  disableButtonActionMethod($event: MouseEvent) { // Call this if I want the button to disable after one click. This doesn't really work.
    ($event.target as HTMLButtonElement).disabled = true; // If I go from one manager item to another then the button is renabled. 
    this.onClick();
  }

}
