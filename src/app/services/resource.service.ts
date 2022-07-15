import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { AuthRequest, Company, Manager, Recipient, Task, Token } from '../json-objects';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  
  private API_BASE_URL = 'http://192.168.0.6:8080/nss/';
  private API_DELETE_TASK = this.API_BASE_URL + 'delete/task/'; // By ID
  private API_DELETE_RECIPIENT = this.API_BASE_URL + 'delete/recipient/'; // By ID
  private API_CREATE_MANAGER = this.API_BASE_URL + "post/create-manager";
  private API_CREATE_COMPANY = this.API_BASE_URL + "create-company";
  private API_GET_COMPANY_BY_ID = this.API_BASE_URL + "get/company/"; 
  private API_GET_MANAGER_BY_ID = this.API_BASE_URL + 'get/manager/';
  private API_UPDATE_RECIPIENT = this.API_BASE_URL + 'put/update-recipient'; // updated
  private API_POST_RECIPIENT = this.API_BASE_URL + 'post/create-recipient'; // updated
  private API_POST_TASK = this.API_BASE_URL + 'post/create-task'; // updated
  private API_UPDATE_TASK = this.API_BASE_URL + 'update/task';  // updated
  private API_POST_COMPANY = this.API_BASE_URL + 'company-login'; // updated
  // private API_CREATE_COMPANY = this.API_BASE_URL + "post/company";
  private API_NOTIFY_MANAGER = this.API_BASE_URL + 'post/notify-manager'; // not updated
  private API_POST_MANAGE_LOGIN = this.API_BASE_URL + "manager-login"; // updated
  private API_DELETE_MANAGER = this.API_BASE_URL + "delete/manager"; // updated
  private API_UPDATE_MANAGER = this.API_BASE_URL + "put/update-manager"; // updated
  
  private API_GENERATE_COMPANY_TOKEN = this.API_BASE_URL + "auth/company/signup";
  private API_GENERATE_MANAGER_TOKEN = this.API_BASE_URL + "auth/manager/signup";

  private API_AUTH = this.API_BASE_URL + "auth/login";
  //  this.data.currentToken.subscribe(token => this.token = token);


  private HEADERS_ONLY_TOKEN = { }

  private HEADERS_CONTENT_TOKEN = { }

  private HEADERS_CONTENT = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  private setHeaders(token: Token) {
    this.HEADERS_CONTENT_TOKEN = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token.access_token
      })
    }
    this.HEADERS_ONLY_TOKEN = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + token.access_token
      })
    }
  }

  constructor(private http: HttpClient) { }

  getCompanyById(company: Company): Observable<Company> {
    const url = `${this.API_GET_COMPANY_BY_ID}${company.companyId}`;
    return this.http.get<Company>(url, this.HEADERS_ONLY_TOKEN);
  }

  loginManager(email: string, password: string, token: Token): Observable<Manager>  {
    const manager: Manager = {
      managerEmail: email,
      managerPassword: password,
      managerFirstName: null,
      managerSelected: null,
      managerLastName: null,
      managerPhone: null,
      maxRecipients: null,
      managerLastLogin: null,
      recipients: []
    }
    // console.log("Token: " + token.access_token);
    this.setHeaders(token);
    return this.postManager(manager);
  }

  postManager(manager: Manager): Observable<Manager> { 
    return this.http.post<Manager>(this.API_POST_MANAGE_LOGIN, manager, this.HEADERS_CONTENT_TOKEN);
  }

  loginCompany(email: string, password: string, token: Token): Observable<Company> {
    const company: Company = {
      companyName: null,
      maxManagers: null,
      creationDate: null,
      companyEmail: email,
      companyPassword: password,
      companyLastLogin: null,
      managers: []
    }
    // console.log("Attempting Login: " + JSON.stringify(company))
    this.setHeaders(token);
    return this.postCompany(company);
  }

  authenticateCompanyLogin(company: Company): Observable<Token> {
    var auth: AuthRequest = {
      email: company.companyEmail!,
      password: company.companyPassword!
    };
    return this.http.post<Token>(this.API_AUTH, auth, this.HEADERS_CONTENT);
  }

  authenticateManagerLogin(manager: Manager): Observable<Token> {
    console.log("HERE " + JSON.stringify(manager));
    var auth: AuthRequest = {
      email: manager.managerEmail!,
      password: manager.managerPassword!
    };
    return this.http.post<Token>(this.API_AUTH, auth, this.HEADERS_CONTENT);
  }

  generateCompanyToken(company: Company): Observable<Token> {
    console.log(JSON.stringify(company));
    return this.http.post<Token>(this.API_GENERATE_COMPANY_TOKEN, company, this.HEADERS_CONTENT);
  }

  createManagerToken(manager: Manager): Subscription {
    return this.generateManagerToken(manager).subscribe();
  }

  generateManagerToken(manager: Manager): Observable<Token> {
    console.log(JSON.stringify(manager));
    return this.http.post<Token>(this.API_GENERATE_MANAGER_TOKEN, manager, this.HEADERS_CONTENT);
  }

  postCompany(company: Company): Observable<Company> {
    // console.log(JSON.stringify(company));
    return this.http.post<Company>(this.API_POST_COMPANY, company, this.HEADERS_CONTENT_TOKEN);
  }

  getManager(manager: Manager): Observable<Manager> {
    const url = `${this.API_GET_MANAGER_BY_ID}${manager.managerId}`;
    return this.http.get<Manager>(url, this.HEADERS_CONTENT_TOKEN);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.API_DELETE_TASK}${task.taskId}`;
    return this.http.delete<Task>(url, this.HEADERS_ONLY_TOKEN);
  }

  deleteRecipient(recipient: Recipient): Observable<Recipient> {
    const url = `${this.API_DELETE_RECIPIENT}${recipient.recipientId}`;
    return this.http.delete<Recipient>(url, this.HEADERS_ONLY_TOKEN);
  }

  updateTask(task: Task): Observable<Task> {
    // console.log(JSON.stringify(task));
    return this.http.put<Task>(this.API_UPDATE_TASK, task, this.HEADERS_CONTENT_TOKEN);
  }

  updateRecipient(recipient: Recipient): Observable<Recipient> {
    // console.log(JSON.stringify(employee));
    return this.http.put<Recipient>(this.API_UPDATE_RECIPIENT, recipient, this.HEADERS_CONTENT_TOKEN);
  }

  updateManager(manager: Manager) {
    return this.http.put<Manager>(this.API_UPDATE_MANAGER, manager, this.HEADERS_CONTENT_TOKEN);
  }

  addRecipient(recipient: Recipient): Observable<Recipient> {
    return this.http.post<Recipient>(this.API_POST_RECIPIENT, recipient, this.HEADERS_CONTENT_TOKEN);
  }

  addTask(newTask: Task): Observable<Task> { 
    // console.log(newTask);
    return this.http.post<Task>(this.API_POST_TASK, newTask, this.HEADERS_CONTENT_TOKEN);
  }

  addCompany(company: Company, token: Token): Observable<Company> {
    // console.log(JSON.stringify(company));
    this.setHeaders(token);
    return this.http.post<Company>(this.API_CREATE_COMPANY, company, this.HEADERS_CONTENT_TOKEN);
  }

  notifyManager(manager: Manager) {
    return this.http.post<Manager>(this.API_NOTIFY_MANAGER, manager, this.HEADERS_CONTENT_TOKEN);
  }

  addManager(manager: Manager) {
    // console.log(newTask);
    this.createManagerToken(manager);
    return this.http.post<Manager>(this.API_CREATE_MANAGER, manager, this.HEADERS_CONTENT_TOKEN);
  }

  deleteManager(managerId: number) {
    const url = `${this.API_DELETE_MANAGER}/${managerId}`;
    return this.http.delete<Manager>(url, this.HEADERS_ONLY_TOKEN);
  }

}
  