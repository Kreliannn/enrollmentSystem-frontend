import { getStudentInterface } from "./student.type"

export interface transactionInterface {
    student : string,
    amount : number,
    date : string
}

export interface getTransactionInterface {
    _id : string,
    student : getStudentInterface,
    amount : number,
    date : string
}