import { getProfInterface } from "./prof.type"

export interface sectionSubjectsInterface  {
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
    students : string[]
}


export interface sectionInterface{
    course : string,
    level : string,
    sem : string,
    section : string,
    subjects : sectionSubjectsInterface[],
    students : string[]
}

export interface getSectionInterface{
    _id : string,
    course : string,
    level : string,
    sem : string,
    section : string,
    students : string[]
    subjects : {
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
        instructor : getProfInterface,
        students : string[]
    }[]
}

