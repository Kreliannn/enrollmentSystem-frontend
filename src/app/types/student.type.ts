import { sectionSubjectsInterface } from "./section.type"


export interface studentInterface {
    name : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    section : string,
    subject : sectionSubjectsInterface[],
    addedSubject : sectionSubjectsInterface[],
    passed : string[],
    failed : string[]
}


