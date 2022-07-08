import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TasksRootComponent } from './components/tasks-root/tasks-root.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { ManagerGreetingComponent } from './components/manager-greeting/manager-greeting.component';
import { AboutCenterComponent } from './components/about-center/about-center.component';
import { ManagerLoginComponent } from './pages/manager-login/manager-login.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthenticateManagerGuard } from './guards/authenticate-manager.guard';
import { CompanyLoginComponent } from './pages/company-login/company-login.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ManagerAddComponent } from './components/manager-add/manager-add.component';
import { CompanyHomeComponent } from './pages/company-home/company-home.component';
import { CompanyGreetingComponent } from './components/company-greeting/company-greeting.component';
import { ManagerItemComponent } from './components/manager-item/manager-item.component';
import { ManagerEditComponent } from './components/manager-edit/manager-edit.component';
import { AuthenticateCompanyGuard } from './guards/authenticate-company.guard';

const appRoutes: Routes = [
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthenticateManagerGuard],
      children: [
        {path: '', component: ManagerGreetingComponent},
        {path: 'about', component: AboutCenterComponent},
        {path: 'editemployee', component: EmployeeEditComponent},
        {path: 'edittask', component: TaskEditComponent},
        {path: 'addemployee', component: EmployeeAddComponent},
        {path: 'addtask', component: TaskAddComponent},
      ]
  }, 
  { path: 'login', component: ManagerLoginComponent },
  { path: 'companylogin', component: CompanyLoginComponent },
  { path: 'signup', component: SignupPageComponent }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'companyhome', component: CompanyHomeComponent, canActivate: [AuthenticateCompanyGuard],
      children: [
        {path: '', component: CompanyGreetingComponent},
        {path: 'addmanager', component: ManagerAddComponent},
        {path: 'editmanager', component: ManagerEditComponent},
      ]
  }];

// path: 'login', component: LoginComponent, outlet:'secondary' // This doesn't seem to work.


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    EmployeesComponent,
    EmployeeItemComponent,
    TaskItemComponent,
    TasksRootComponent,
    TaskAddComponent,
    EmployeeAddComponent,
    AboutPageComponent,
    FooterComponent,
    EmployeeEditComponent,
    NavigationBarComponent,
    HomePageComponent,
    TaskEditComponent,
    ManagerGreetingComponent,
    AboutCenterComponent,
    ManagerLoginComponent,
    SignupPageComponent,
    CompanyLoginComponent,
    ManagersComponent,
    ManagerAddComponent,
    CompanyHomeComponent,
    CompanyGreetingComponent,
    ManagerItemComponent,
    ManagerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes) // RouterModule.forRoot(appRoutes, {enableTracing: true}) 
  ],
  providers: [AuthenticateManagerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
