import { getSectionSubjectsInterface } from "../types/section.type";

export  const convertGradeLevel = (index : number) => {
    switch(index)
    {
        case 1:  return ["1st year" , "1st sem"]; break;
        case 2:  return ["1st year" , "2nd sem"]; break;
        case 3:  return ["2nd year" , "1st sem"]; break;
        case 4:  return ["2nd year" , "2nd  sem"]; break;
        case 5:  return ["3rd year" , "1st sem"]; break;
        case 6:  return ["3rd year" , "2nd  sem"]; break;
        case 7:  return ["4th year" , "1st sem"]; break;
        case 8:  return ["4th year" , "2nd  sem"]; break;
        case 9:  return ["5th year" , "1st sem"]; break;
        case 10:  return ["5th year" , "2nd  sem"]; break;
        default:  return "error hahaha";  break;
    }
}

export const formatToAmPm = (timeStr: string) => {
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 to 12
    return `${hour}:${minute} ${ampm}`;
  }
  

export function hasDuplicates(arr : string[]) {
    return new Set(arr).size !== arr.length;
  }
 

export const subjectAvailability = (subject : getSectionSubjectsInterface, subjectTaken : getSectionSubjectsInterface[], passed : string[], currentSubject : getSectionSubjectsInterface[]) => {
  
  if((subjectTaken.length + currentSubject.length) >= 10) return true
  
  if(!passed.includes(subject.code) && !subjectTaken.map(sub => sub.code).includes(subject.code) && !currentSubject.map(sub => sub.code).includes(subject.code)){
      if(subject.prerequisite == "none" || passed.includes(subject.prerequisite)){
        return false
      }
  }
  return true
} 
  