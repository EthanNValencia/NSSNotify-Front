export interface Task {
    id?: number,
    taskSelected: boolean,
    taskDateUpdated: boolean | null,
    taskNotifyTime: string | null,
    taskStartTime: string | null,
    taskEndTime: string | null,
    taskName: string | null,
    taskDescription: string | null,
    taskStreet: string | null,
    taskCity: string | null,
    taskState: string | null,
    taskZipCode: string | null,
    taskMessage: string | null,
    taskDate: {
        id?: number,
        date: string | null
    },
    frequency: {
        id?: number,
        frequency: string | null
    }, 
    employee: {
        id: number,
    }
}

export interface Frequency {
    id?: number, 
    frequency: string
}

export interface TaskDate {
    id?: number,
    date: string
}