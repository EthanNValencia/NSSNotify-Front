import {Employee} from "./employee";

export const EMPLOYEES: Employee[] = [
    {
        id: 1,
        employeeSelected: false,
        employeeFirstName: 'Bob',
        employeeLastName: 'Skell',
        employeePhone: '407-854-9000',
        employeeEmail: 'bobskell@gmail.com',
        employeeHasDailyTask: false,
        tasks: [{
                    id: 2,
                    taskSelected: false,
                    taskNotifyTime: "14:50:00.0",
                    taskStartTime: '15:50:00.0',
                    taskEndTime: '16:20:50.0',
                    taskName: "Test task",
                    taskDescription: 'Testing another',
                    taskStreet: 'Blooping Lane',
                    taskCity: 'Zeeland',
                    taskState: 'MI',
                    taskZipCode: '49873',
                    taskMessage: 'More things.',
                    taskDate: {
                        id: 2,
                        date: '2022-05-15'
                    },
                    frequency: {
                        id: 4,
                        frequency: 'WEDNESDAY'
                    }, employee: {
                        id: 1
                    }
                },
                {
                    id: 1,
                    taskSelected: false,
                    taskNotifyTime: "14:50:00.0",
                    taskStartTime: '12:45:00.0',
                    taskEndTime: '12:50:00.0',
                    taskName: "Test task",
                    taskDescription: 'Testing Task',
                    taskStreet: '1907 Meadow Crest Dr.',
                    taskCity: 'Apopka',
                    taskState: 'FL',
                    taskZipCode: '32712',
                    taskMessage: 'Do not forget to do the things. Please!',
                    taskDate: {
                        id: 2,
                        date: '2022-05-18'
                    },
                    frequency: {
                        id: 8,
                        frequency: 'EVERYDAY'
                    }, employee: {
                        id: 1
                    }
                }],
        
    },
    
]