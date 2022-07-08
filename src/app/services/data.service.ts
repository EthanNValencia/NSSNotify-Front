import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Company, Employee, Manager } from '../employee';
import { Task } from '../task';
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

  private editEmployee: BehaviorSubject<Employee> = this.getInitialEmployeeEdit();
  currentEmployeeEdit = this.editEmployee.asObservable();

  private manager: BehaviorSubject<Manager> = this.getInitialManager();
  currentManager = this.manager.asObservable();

  public employeeItemSelectedSubject = new BehaviorSubject<boolean>(false);
  employeeItemSelected = this.employeeItemSelectedSubject.asObservable();

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

  public addCompany(company: Company, resourceService: ResourceService): Observable<Company> {
    company.creationDate = this.minDate;
    // console.log(JSON.stringify(company));
    return resourceService.addCompany(company);
    // this.changeCompany(company);
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
    if(this.minDate == task.taskDate.date) {
      if(notifyHour <= this.minHour!) {
        if(notifyMinute <= this.minMinute!) {
          // console.log("FALSE");
          return false;
        }
      }
    } 
    // console.log("TRUE");
    return true;
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
      id: 0,
      taskSelected: false,
      taskDateUpdated: false,
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
    return task;
  }

  constructInitialEmployeeEdit(): Employee {
    const employee = {
      employeeSelected: false,
      employeeFirstName: 'Test',
      employeeLastName: 'Test',
      employeePhone: 'Test',
      employeeEmail: 'Test',
      employeeLastMessage: null,
      employeeHasDailyTask: false,
      tasks: null,
    }
    return employee;
  }

  constructInitialManager(): Manager {
    const employees: Employee[] = []; 
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
      employees: employees
    }
    return manager; 
  }

  constructEmptyCompany(): Company {
    const company: Company = {
      id: null,
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

  private getInitialTasks(): BehaviorSubject<Task[]> {
    return new BehaviorSubject<Task[]>(this.constructInitialTasks());
  }

  private getInitialEmployeeEdit(): BehaviorSubject<Employee> {
    return new BehaviorSubject<Employee>(this.constructInitialEmployeeEdit());
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

  changeTasks(tasks: Task[], employee: Employee) {
    this.tasks.next(tasks);
    this.editEmployee.next(employee);
  }

  changeManager(manager: Manager) {
    if(manager != null) {
      if(this.selectedEmployeeId !== null) {
        for (var i = 0; i < manager.employees!.length; i++) {
          if(manager.employees![i].id === this.selectedEmployeeId) {
            manager.employees![i].employeeSelected = true;
            this.changeTasks(manager.employees![i].tasks!, manager.employees![i]);
          }
        }
      }
      this.manager.next(manager);
    }
  }

  changeEmployeeEdit(employee: Employee) {
    this.editEmployee.next(employee);
  }

  changeEmployeeItemSelected(bool: boolean) {
    this.employeeItemSelectedSubject.next(bool);
  }
  
  public addEmployee(employee: Employee, resource: ResourceService) {
    resource.addEmployee(employee).subscribe(() => resource.getManager().subscribe((manager) => (this.changeManager(manager))));
  }

  public addTask(task: Task, resource: ResourceService, uiService: UiService) {
    resource.addTask(task).subscribe(() => resource.getManager().subscribe((manager) => (this.changeManager(manager))));
  }

  public addManager(manager: Manager, companyId: number, resource: ResourceService) {
    resource.addManager(manager, companyId).subscribe(
      () => resource.getCompany().subscribe((company) => (this.changeCompany(company)))
    );
  }

  public deleteManager(managerId: number, resource: ResourceService) {
    resource.deleteManager(managerId).subscribe(
      () => resource.getCompany().subscribe((company) => (this.changeCompany(company)))
    );
  }
  
  public beginLogin(email: string, password: string, resource: ResourceService) {
    return resource.loginManager(email, password);
  }

  public beginCompanyLogin(email: string, password: string, resource: ResourceService) {
    return resource.loginCompany(email, password);
  }

}