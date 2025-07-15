

export  const convertGradeLevel = (index : number) => {
    switch(index)
    {
        case 1:  return "1st year"; break;
        case 2:  return "2nd year"; break;
        case 3:  return "3rd year"; break;
        case 4:  return "4th year"; break;
        case 5:  return "5th year"; break;
        default:  return "error hahaha";  break;
    }
}