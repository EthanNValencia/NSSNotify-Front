import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Manager, Task } from '../json-objects';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // RIGHT-SIDE (Home: Tasks)
  private rightTop: boolean = false;
  private rightTopSubject = new Subject<any>();
  private rightEdit: boolean = false;
  private rightEditSubject = new Subject<any>();
  // RIGHT-SIDE

  // LEFT-SIDE (Home: Employees, ???: Manager)
  private leftTop: boolean = false;
  private leftTopSubject = new Subject<any>();
  private leftEdit: boolean = false;
  private leftEditSubject = new Subject<any>();
  // LEFT-SIDE

  // SLIM UI
  private leftSlimUI: boolean = false;
  private leftSlimUISubject = new Subject<any>();
  private rightSlimUI: boolean = false;
  private rightSlimUISubject = new Subject<any>();
  // SLIM UI

  constructor() { 

  }


  leftEditFalse() {
    this.leftEdit = false;
    this.leftEditSubject.next(this.leftEdit);
  }

  rightEditFalse() {
    this.rightEdit = false;
    this.rightEditSubject.next(this.rightEdit);
  }

  leftTopFalse() {
    this.leftTop = false;
    this.leftTopSubject.next(this.leftTop);
  }

  rightTopFalse() {
    this.rightTop = false;
    this.rightTopSubject.next(this.rightTop);
  }

  clearUI(): void {
    this.rightTopFalse();
    this.leftTopFalse();
    this.rightEditFalse();
    this.leftEditFalse();
  }

  toggleRightTop(): void {
    this.rightTop = !this.rightTop;
    this.rightTopSubject.next(this.rightTop);
    if(this.rightTop) {
      this.leftTopFalse();
      this.rightEditFalse();
      this.leftEditFalse();
    }
  }

  toggleLeftTop(): void {
    this.leftTop = !this.leftTop;
    this.leftTopSubject.next(this.leftTop);
    if(this.leftTop) {
      this.rightTopFalse();
      this.rightEditFalse();
      this.leftEditFalse();
    }
  }

  toggleRightEdit(): void {
    this.rightEdit = !this.rightEdit;
    this.rightEditSubject.next(this.rightEdit);
    if(this.rightEdit) {
      this.rightTopFalse();
      this.leftTopFalse();
      this.leftEditFalse();
    }
  }

  toggleLeftEdit(): void {
    this.leftEdit = !this.leftEdit;
    this.leftEditSubject.next(this.leftEdit);
    if(this.leftEdit) {
      this.rightTopFalse();
      this.leftTopFalse();
      this.rightEditFalse();
    }
  }
  
  onLeftTopSubjectToggle(): Observable<any> {
    return this.leftTopSubject.asObservable();
  }

  onRightTopSubjectToggle(): Observable<any> {
    return this.rightTopSubject.asObservable();
  }

  onLeftEditSubjectToggle(): Observable<any> {
    return this.leftEditSubject.asObservable();
  }

  onRightEditSubjectToggle(): Observable<any> {
    return this.rightEditSubject.asObservable();
  }

  onLeftSlimUICheckToggle(): Observable<any> {
    return this.leftSlimUISubject.asObservable();
  }

  onRightSlimUICheckToggle(): Observable<any> {
    return this.rightSlimUISubject.asObservable();
  }

  rightSlimUICheckTasks(tasks: Task[]) {
    this.rightSlimUI = (tasks!.length > 4);
    this.rightSlimUISubject.next(this.rightSlimUI);
  }

  leftSlimUICheckManager(manager: Manager) {
    this.leftSlimUI = (manager.recipients!.length >= 5);
    this.leftSlimUISubject.next(this.leftSlimUI);
  }

}
