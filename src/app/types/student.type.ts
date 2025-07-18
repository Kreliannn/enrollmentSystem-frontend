import { sectionSubjects } from "./section.type"


export interface studentInterface {
    name : string,
    studentId : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    section : string,
    subjects : string[],
    passed : string[],
    failed : string[]
}

export interface getStudentInterface {
    _id : string,
    name : string,
    studentId : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    section : string,
    subjects : sectionSubjects[],
    passed : string[],
    failed : string[]
}



