interface IEmployee{
    id: number;
    employeeId: string;
    firstname:string;
    lastname:string;
    dateJoined: Date;
    salary: number;
}
export class Employee implements IEmployee {
    public id: number;
    public employeeId: string;
    public firstname:string;
    public lastname:string;
    public dateJoined: Date;
    public salary: number;

    constructor(id: number, employeeId: string, firstname: string,lastname:string,dateJoined:Date,salary:number) {
        this.id = id;
        this.employeeId = employeeId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateJoined = dateJoined;
        this.salary = salary;
    }

    get fullName() {
        return `${this.firstname} ${this.lastname}`;
    }

}