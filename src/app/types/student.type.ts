import { sectionSubjectsInterface } from "./section.type"


export interface studentInterface {
    name : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    section : string,
    subjects : sectionSubjectsInterface[],
    addedSubjects : sectionSubjectsInterface[],
    passed : string[],
    failed : string[]
}


export interface getStudentInterface extends studentInterface {
    _id : string
}

