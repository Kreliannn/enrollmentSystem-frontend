import { getStudentInterface } from "./student.type"

export interface queueInterface {
    student : string,
    number : number,
    date : string
}

export interface getQueueInterface {
    _id : string,
    student : getStudentInterface,
    number : number,
    date : string
}