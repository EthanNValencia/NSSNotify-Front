import { Task } from "./task"

export interface Employee {
    id?: number | null,
    employeeSelected: boolean,
    employeeFirstName: string,
    employeeLastName: string,
    employeePhone: string,
    employeeEmail: string,
    employeeLastMessage: string | null,
    employeeHasDailyTask: boolean,
    tasks?: Task[] | null,
    manager?: Manager
}

export interface Company {
    id?: number | null,
    companyName: string,
    companyPassword: string | null,
    companyLastLogin: string | null,
    maxManagers: number,
    creationDate: string,
    companyEmail: string,
    managers?: Manager[]
}

export interface Manager {
    id?: number | null,
    managerFirstName?: string,
    managerLastName?: string,
    managerLastLogin: string | null,
    managerSelected: boolean,
    managerPhone: string,
    managerEmail: string,
    managerPassword: string,
    maxEmployees: number,
    employees?: Employee[]
}