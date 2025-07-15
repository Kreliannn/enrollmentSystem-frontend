
export interface subjectsInterface {
    name : string,
    code : string,
    units : number,
    type : string,
}

export interface yearLevelInterface {
    level : string,
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