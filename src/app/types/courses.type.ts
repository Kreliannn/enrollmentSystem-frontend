
export interface subjectsInterface {
    name : string,
    code : string,
    units : number,
    type : string,
    prerequisite : string
}

export interface yearLevelInterface {
    level : string,
    sem : string,
    subjects :  subjectsInterface[]
}


export interface courseInterface {
    course : string,
    code : string,
    year : yearLevelInterface[]
}


export interface getCoursesInterface extends courseInterface {
    _id : string
}