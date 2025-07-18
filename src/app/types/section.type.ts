export interface enrolledInterface {
    studentId : string,
    studentName : string
}

export interface sectionSubjectsInterface  {
    course : string,
    name : string,
    code : string,
    prerequisite : string
    units : number,
    type : string,
    days : string,
    start : string,
    end : string,
    section : string,
    room : string,
    instructor : string,
    students : enrolledInterface[]
}


export interface sectionInterface{
    course : string,
    level : string,
    sem : string,
    section : string,
    subjects : sectionSubjectsInterface[],
    students : enrolledInterface[]
}

export interface getSectionInterface extends sectionInterface {
    _id : string
}

