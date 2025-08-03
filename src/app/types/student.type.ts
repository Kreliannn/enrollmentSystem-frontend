import { getSectionSubjectsInterface } from "./section.type"


export interface studentInterface {
    name : string,
    studentId : string,
    password : string,
    course : string,
    status : string,
    level : string,
    gender : string,
    sem : string,
    balance : number,
    section : string,
    subjects : string[],
    passed : string[],
    failed : string[],
    requirements: string[],
}

export interface getStudentInterface {
    _id : string,
    name : string,
    password : string,
    studentId : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    balance : number,
    status : string,
    section : string,
    subjects : getSectionSubjectsInterface[],
    passed : string[],
    failed : string[],
    requirements: string[],
}



