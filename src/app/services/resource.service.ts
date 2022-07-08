import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Company, Employee, Manager } from '../employee';
import { Task, Frequency } from '../task';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  
  private API_BASE_URL = 'https://192.168.0.6:8085/rest/';
  private API_GET_EMPLOYEES = this.API_BASE_URL + 'get/employees';
  private API_GET_MANAGER = this.API_BASE_URL + 'get/manager';
  private API_DELETE_TASK = this.API_BASE_URL + 'delete/task';
  private API_DELETE_EMPLOYEE = this.API_BASE_URL + 'delete/employee';
  private API_UPDATE_EMPLOYEE = this.API_BASE_URL + 'put/employee';
  private API_POST_EMPLOYEE = this.API_BASE_URL + 'post/create-employee';
  private API_POST_TASK = this.API_BASE_URL + 'post/create-task';
  private API_UPDATE_TASK = this.API_BASE_URL + 'put/task';
  private API_GET_FREQUENCIES = this.API_BASE_URL + 'get/frequencies';
  private API_POST_COMPANY = this.API_BASE_URL + 'post/create-company';
  private API_GET_COMPANY = this.API_BASE_URL + 'get/company';
  private API_NOTIFY_MANAGER = this.API_BASE_URL + 'post/notify-manager';
  private API_POST_MANAGER = this.API_BASE_URL + "post/create-manager";
  private API_DELETE_MANAGER = this.API_BASE_URL + "delete/manager";
  private API_UPDATE_MANAGER = this.API_BASE_URL + "put/manager";
  private managerId = 1; // The ID will be generated dynamically when the login is setup.
  private managerPassword!: string;
  private managerEmail!: string;
  private companyPassword!: string;
  private companyEmail!: string;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> { // This is deprecated
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'manager_id' : this.managerId.toString()
      })
    }
    return this.http.get<Employee[]>(this.API_GET_EMPLOYEES, httpOptions);
  }

  loginManager(email: string, password: string) {
    this.managerEmail = email;
    this.managerPassword = password;
    return this.getManager();
  }

  loginCompany(email: string, password: string) {
    this.companyEmail = email;
    this.companyPassword = password;
    var company: Observable<Company> = this.getCompany();
    console.log("HERE " + company);
    if(company == null){
      throwError(() => new Error('test'))
    }
    return company;
  }

  getManager(): Observable<Manager> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'manager_email' : this.managerEmail, 
        'manager_password' : this.managerPassword
      })
    }
    return this.http.get<Manager>(this.API_GET_MANAGER, httpOptions);
  }

  getCompany(): Observable<Company> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'company_email' : this.companyEmail, 
        'company_password' : this.companyPassword
      })
    }
    return this.http.get<Company>(this.API_GET_COMPANY, httpOptions);
  }

  getFrequencies(): Observable<Frequency[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e'
      })
    }
    return this.http.get<Frequency[]>(this.API_GET_FREQUENCIES, httpOptions);
  }
  
  deleteTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e'
      })
    }
    const url = `${this.API_DELETE_TASK}/${task.id}`;
    return this.http.delete<Task>(url, httpOptions);
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e'
      })
    }
    const url = `${this.API_DELETE_EMPLOYEE}/${employee.id}`;
    return this.http.delete<Employee>(url, httpOptions);
  }

  updateTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json'
      })
    }
    // console.log(JSON.stringify(task));
    return this.http.put<Task>(this.API_UPDATE_TASK, task, httpOptions);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json'
      })
    }
    // console.log(JSON.stringify(employee));
    return this.http.put<Employee>(this.API_UPDATE_EMPLOYEE, employee, httpOptions);
  }

  updateManager(manager: Manager) {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json'
      })
    }
    // manager.employees = [];
    // console.log(JSON.stringify(manager));
    return this.http.put<Manager>(this.API_UPDATE_MANAGER, manager, httpOptions);
  }

  addEmployee(newEmployee: Employee): Observable<Employee> { 
    newEmployee.manager!.id = this.managerId;
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json',
      })
    }
    // console.log(newEmployee);
    return this.http.post<Employee>(this.API_POST_EMPLOYEE, newEmployee, httpOptions);
  }

  addTask(newTask: Task): Observable<Task> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json',
      })
    }
    // console.log(newTask);
    return this.http.post<Task>(this.API_POST_TASK, newTask, httpOptions);
  }

  addCompany(company: Company): Observable<Company> {
    this.companyEmail = company.companyEmail;
    this.companyPassword = company.companyPassword!;
    console.log(JSON.stringify(company));
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json',
        'company_email' : this.companyEmail,
        'company_password' : this.companyPassword,
      })
    }
    return this.http.post<Company>(this.API_POST_COMPANY, company, httpOptions);
  }

  notifyManager(manager: Manager) {
    console.log(manager);
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json',
      })
    }
    return this.http.post<Manager>(this.API_NOTIFY_MANAGER, manager, httpOptions);
  }

  addManager(manager: Manager, companyId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e',
        'content-type' : 'application/json',
        'company_id' : companyId.toString()
      })
    }
    // console.log(newTask);
    return this.http.post<Manager>(this.API_POST_MANAGER, manager, httpOptions);
  }

  deleteManager(managerId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key' : '11cad700-827c-47c2-9c8e-ad554539d63e'
      })
    }
    const url = `${this.API_DELETE_MANAGER}/${managerId}`;
    return this.http.delete<Manager>(url, httpOptions);
  }

}
  