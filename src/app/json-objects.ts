export interface Company {
    companyId?: number | null,
    companyName?: string | null,
    maxManagers?: number | null,
    creationDate?: string | null,
    companyEmail?: string | null,
    companyPassword?: string | null,
    companyLastLogin?: string | null,
    managers?: Manager[]
}

export interface Manager {
    managerId?: number | null,
    managerFirstName?: string | null,
    managerSelected?: boolean | null,
    managerLastName?: string | null,
    managerPhone?: string | null,
    managerEmail?: string | null,
    managerPassword?: string | null,
    maxRecipients?: number | null,
    managerLastLogin?: string | null,
    company?: Company,
    recipients?: Recipient[]
}

export interface Recipient {
    recipientId?: number | null,
    recipientSelected?: boolean | null,
    recipientHasDailyTask?: boolean | null,
    recipientFirstName?: string | null,
    recipientLastName?: string | null,
    recipientPhone?: string | null,
    recipientEmail?: string | null,
    recipientLastMessage?: null,
    manager?: Manager | null,
    tasks?: Task[]
}

export interface Task {
    taskId?: number | null,
    taskSelected: boolean,
    taskNotifyTime: string | null,
    taskStartTime: string | null,
    taskEndTime: string | null,
    notifyDate: string | null,
    notifyFrequency: string | null,
    taskName: string | null,
    taskDescription: string | null,
    taskStreet: string | null,
    taskCity: string | null,
    taskState: string | null,
    taskZipCode: string | null,
    taskSent: boolean | null,
    taskDateUpdated: boolean | null,
    taskMessage: string | null,
    recipient: Recipient | null,
}

export interface Token {
    email: string,
    access_token: string
}

export interface AuthRequest {
    email: string,
    password: string
}