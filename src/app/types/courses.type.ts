export interface courseInterface {
    course : string,
    code : string,
    year : {
        level : string,
        subjects : {
            name : string,
            code : string,
            units : string,
            type : string,
        }[]
    }[],
}