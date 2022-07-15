import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company, Manager, Recipient, Task, Token } from '../json-objects';
import { ResourceService } from './resource.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private company: BehaviorSubject<Company> = this.getNullCompany();
  currentCompany = this.company.asObservable();

  private editTask: BehaviorSubject<Task> = this.getInitialTask();
  currentTaskEdit = this.editTask.asObservable();

  private tasks: BehaviorSubject<Task[]> = this.getInitialTasks();
  currentTasks = this.tasks.asObservable();

  private editRecipient: BehaviorSubject<Recipient> = this.getInitialRecipientEdit();
  currentRecipientEdit = this.editRecipient.asObservable();

  private manager: BehaviorSubject<Manager> = this.getInitialManager();
  currentManager = this.manager.asObservable();

  public employeeItemSelectedSubject = new BehaviorSubject<boolean>(false);
  employeeItemSelected = this.employeeItemSelectedSubject.asObservable();


  private token: BehaviorSubject<Token> = this.getEmptyToken();
  currentToken = this.token.asObservable();

  private timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private rightNowDateTime = new Date();
  private minTime: string;
  private minDate: string;
  private maxDate: string;
  
  private minMinute: number | undefined;
  private minHour: number | undefined;
  private managerCredsValidated: boolean = false;

  selectedEmployeeId: null | number | undefined = null;

  public getTime(): string {
    return this.rightNowDateTime.toLocaleString();
  }

  public getMinTime(): string {
    return this.minTime;
  }

  public getMinDate(): string {
    return this.minDate;
  }

  public getMaxDate(): string {
    return this.maxDate;
  }

  constructor() {
    // this.experimentTime();
    this.minTime = this.setMinTime();
    this.minDate = this.setMinDate();
    this.maxDate = this.setMaxDate();
    // this.experimentTime();
  }

  private setMinDate(): string { 
    const today = new Date();
    // const yesterday = new Date(today);
    // yesterday.setDate(yesterday.getDate());
    // console.log("Today obj: " + today);
    // console.log("Yesterday obj: " + yesterday);
    // var todayDate = yesterday.toISOString().split("T")[0];
    // console.log("TodayString: " + todayDate);
    // console.log("TodayString: " + this.convertDateToString(today));
    return this.convertDateToString(today);
  }

  private convertDateToString(date: Date) {
    if(this.minHour! >= 21) {
      date.setDate(date.getDate() - 1);
      return date.toISOString().split("T")[0];
    }
    return date.toISOString().split("T")[0];
  }

  private setMaxDate(): string {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    var nextWeekDate = nextWeek.toISOString().split("T")[0];
    return nextWeekDate;
  }

  private setMinTime(): string {
    var timeDate = this.addHourToDate(this.rightNowDateTime);
    this.minHour = timeDate.getHours();
    this.minMinute = timeDate.getMinutes();
    var timeString = timeDate.toTimeString();
    // console.log("Time String: " + timeString);
    timeString = timeString.substring(0, 5);
    return timeString;
  }

  public addCompany(company: Company, resourceService: ResourceService, token: Token): Observable<Company> {
    company.creationDate = this.minDate;
    // console.log(JSON.stringify(company));
    return resourceService.addCompany(company, token);
    // this.changeCompany(company);
    // return resourceService.createCompanyAndToken(company);
  }

  experimentTime() {
    console.log(this.timezone);
    console.log(this.rightNowDateTime.toLocaleString());
    console.log(this.rightNowDateTime.toTimeString());
    console.log(this.minTime);
    console.log(this.minDate);
  }

  checkNotificationTime(task: Task): boolean {
    var notifyHour = parseInt(task.taskNotifyTime!.substring(0, 2), 10);
    var notifyMinute = parseInt(task.taskNotifyTime!.substring(3, 6), 10); // 20:30
    this.minTime = this.setMinTime();
    this.minDate = this.setMinDate();
    this.maxDate = this.setMaxDate();
    // console.log("TASKTIME: " + task.taskNotifyTime!);
    // var notifyMinute =  parseInt(task.taskNotifyTime!.substring(3, 5), 10);
    // console.log("The notify time is: " + notifyHour + ":" + notifyMinute);
    // console.log("The this.minHour+this.minMinute is: " + this.minHour + ":" + this.minMinute);
    if(this.minDate == task.notifyDate!) {
      console.log("True 1");
      if((notifyHour >= this.minHour!) && (notifyMinute >= this.minMinute!)) {
        console.log("True 2");
        return true;
      }
    }
    /*
    console.log("this.minDate == task.notifyDate: " + (this.minDate == task.notifyDate!));
    console.log("this.minDate === task.notifyDate: " + (this.minDate === task.notifyDate!));
    console.log("2022-07-11" == "2022-07-11");
    console.log("Min Date: " + this.minDate + " Min Hour: " + this.minHour + " Min Minute: " + this.minMinute);
    console.log("Task Date " + task.notifyDate + " Task Hour: " + notifyHour + " Task Minute: " + notifyMinute);
    */
    return false;
  }

  addHourToDate(date: Date): Date {
    if(date.getMinutes() >= 30) {
      return new Date(new Date(date).setHours(date.getHours() + 1));
    }
    return new Date(new Date(date).setHours(date.getHours() + 1));
  }

  setToInitialTasks(): void {
    console.log("In DataService, setToInitialTasks");
  }

  constructInitialTasks(): Task[] {
    const task = { 
      id: 0,
      taskSelected: false,
      taskNotifyTime: "",
      taskStartTime: "",
      taskEndTime: "",
      taskName: "",
      taskDescription: "",
      taskStreet: "",
      taskCity: "",
      taskState: "",
      taskZipCode: "",
      taskMessage: "",
      taskDate: {
          id: 0,
          date: ""
      },
      frequency: {
          id: 0,
          frequency: ""
      }, employee: {
          id: 0,
      }
    };
    const tasks = new Array(); 
    tasks[0] = task;
    return tasks;
  }

  constructInitialTask(): Task {
    const task = { 
      taskSelected: false,
      taskNotifyTime: "",
      taskStartTime: "",
      taskEndTime: "",
      notifyDate: "",
      notifyFrequency: "",
      taskName: "",
      taskDescription: "",
      taskStreet: "",
      taskCity: "",
      taskState: "",
      taskZipCode: "",
      taskSent: false,
      taskDateUpdated: false,
      taskMessage: "",
      recipient: null,
    };
    return task;
  }

  constructInitialRecipientEdit(): Recipient {
    const recipient = {
      recipientSelected: false,
      recipientHasDailyTask: false,
      recipientFirstName: 'Test',
      recipientLastName: 'Test',
      recipientPhone: 'Test',
      recipientEmail: 'Test',
      recipientLastMessage: null,
      tasks: []
    }
    return recipient;
  }

  constructInitialManager(): Manager {
    const recipients: Recipient[] = []; 
    const manager = {
      id: null,
      managerFirstName: 'Test',
      managerLastName: 'Test',
      managerSelected: false,
      managerLastLogin: null,
      managerPhone: 'Test',
      managerEmail: 'Test',
      managerPassword: 'Test',
      maxEmployees: 0,
      recipients: recipients
    }
    return manager; 
  }

  constructEmptyCompany(): Company {
    const company: Company = {
      companyId: null,
      companyName: '',
      companyPassword: null,
      maxManagers: 0,
      creationDate: '',
      companyEmail: '',
      managers: [],
      companyLastLogin: null
    }
    return company;
  }

  constructEmptyToken(): Token {
    const token: Token = {
      email: '',
      access_token: ''
    }
    return token;
  }

  private getInitialTasks(): BehaviorSubject<Task[]> {
    return new BehaviorSubject<Task[]>(this.constructInitialTasks());
  }

  private getInitialRecipientEdit(): BehaviorSubject<Recipient> {
    return new BehaviorSubject<Recipient>(this.constructInitialRecipientEdit());
  }

  private getInitialManager(): BehaviorSubject<Manager> {
    return new BehaviorSubject<Manager>(this.constructInitialManager());
  }

  private getInitialTask(): BehaviorSubject<Task> {
    return new BehaviorSubject<Task>(this.constructInitialTask());
  }

  private getNullCompany(): BehaviorSubject<Company> {
    return new BehaviorSubject<Company>(this.constructEmptyCompany());
  }

  getEmptyToken(): BehaviorSubject<Token> {
    return new BehaviorSubject<Token>(this.constructEmptyToken());
  }

  checkPhoneNumber(employeePhone: string): boolean {
    if(employeePhone.substring(0, 1) !== "+") {
      return false;
    }
    if(employeePhone.length !== 12) {
      return false;
    }
    if(!this.isNumeric(employeePhone.substring(1, 12))) {
      return false;
    }
    return true;
  }

  isNumeric(value: string) {
    if(value.match(/^-?\d+$/)) {
        return true;
    }
    return false;
  }

  changeCompany(company: Company) {
    if(company != null) {
      this.company.next(company);
    }
  }

  changeTask(task: Task) {
    this.editTask.next(task);
  }

  changeToken(token: Token) {
    if(token != null) {
      console.log("Change Token: " + token.access_token);
      this.token.next(token);
    }
  }

  changeTasks(tasks: Task[], recipient: Recipient) {
    this.tasks.next(tasks);
    this.editRecipient.next(recipient);
  }

  changeManager(manager: Manager) {
    if(manager != null) {
      if(this.selectedEmployeeId !== null) {
        for (var i = 0; i < manager.recipients!.length; i++) {
          if(manager.recipients![i].recipientId === this.selectedEmployeeId) {
            manager.recipients![i].recipientSelected = true;
            this.changeTasks(manager.recipients![i].tasks!, manager.recipients![i]);
          }
        }
      }
      this.manager.next(manager);
    }
  }

  changeEmployeeEdit(recipient: Recipient) {
    this.editRecipient.next(recipient);
  }

  changeEmployeeItemSelected(bool: boolean) {
    this.employeeItemSelectedSubject.next(bool);
  }
  
  public addRecipient(recipient: Recipient, manager: Manager, resource: ResourceService) {

    resource.addRecipient(recipient).subscribe(() => resource.getManager(manager).subscribe((manager) => (this.changeManager(manager))));
  }

  public addTask(task: Task, manager: Manager, resource: ResourceService, uiService: UiService) { 
    resource.addTask(task).subscribe(() => resource.getManager(manager).subscribe((manager) => (this.changeManager(manager))));
  }

  public addManager(manager: Manager, company: Company, resource: ResourceService) {
    resource.addManager(manager).subscribe (
      () => resource.getCompanyById(company).subscribe((company) => (this.changeCompany(company)))
    );
  }

  public deleteManager(managerId: number, company: Company, resource: ResourceService) {
    resource.deleteManager(managerId).subscribe(
      () => resource.getCompanyById(company).subscribe((company) => (this.changeCompany(company)))
    );
  }
  
  public beginManagerLogin(email: string, password: string, resource: ResourceService, token: Token) {
    return resource.loginManager(email, password, token);
  }

  public beginCompanyLogin(email: string, password: string, resource: ResourceService, token: Token) {
    // console.log(email); console.log(password);
    return resource.loginCompany(email, password, token);
  }

  public generateCompanyToken(company: Company, resource: ResourceService): Observable<Token> {
    return resource.generateCompanyToken(company);
  }

  public getCompanyToken(company: Company, resource: ResourceService): Observable<Token> {
    return resource.authenticateCompanyLogin(company);
  }

  public getManagerToken(manager: Manager, resource: ResourceService): Observable<Token> {
    return resource.authenticateManagerLogin(manager);
  }

}