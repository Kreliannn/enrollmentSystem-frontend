import { getStudentInterface } from "./student.type"

export interface profSubInterface  {
    course : string,
    name : string,
    code : string,
    prerequisite : string
    units : number,
    days : string,
    start : string,
    end : string,
    section : string,
    room : string,
    instructor : string,
    students : getStudentInterface[]
}


export interface profInterface {
    name : string,
    email : string,
    password : string,
    contact : string,
    schedules : profSubInterface[]
}


export interface getProfInterface extends profInterface {
    _id : string
}




