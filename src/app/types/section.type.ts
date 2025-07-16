export interface sectionSubjectsInterface  {
    name : string,
    code : string,
    units : number,
    type : string,
    days : string,
    start : string,
    end : string,
    section : string,
    room : string,
    instructor : string,
}

export interface enrolledInterface {
    studentId : string,
    studentName : string
}

export interface sectionInterface{
    course : string,
    level : string,
    sem : string,
    subjects : sectionSubjectsInterface[],
    students : enrolledInterface[]
}

export interface getSectionInterface extends sectionInterface {
    _id : string
}

