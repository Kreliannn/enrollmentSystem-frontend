import { sectionSubjectsInterface } from "./section.type"

export interface profInterface {
    name : string,
    email : string,
    password : string,
    contact : string,
    shedules : sectionSubjectsInterface[]
}


export interface getProfInterface extends profInterface {
    _id : string
}




