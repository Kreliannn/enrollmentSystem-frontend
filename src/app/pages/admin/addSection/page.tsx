"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { useQuery } from "@tanstack/react-query"
import { getCoursesInterface, yearLevelInterface, subjectsInterface } from "@/app/types/courses.type"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { sectionSubjectsInterface, sectionInterface } from "@/app/types/section.type"
import { formatToAmPm } from "@/app/utils/customFunction"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { useMutation } from "@tanstack/react-query"


export default function Page(){

    const [courses, setCourses] = useState<getCoursesInterface[]>([])

    const { data } = useQuery({
        queryKey : ["courses"],
        queryFn : () => axios.get(backendUrl("/course"))
    })
    
    useEffect(() => { data?.data && setCourses(data.data) }, [data])

    const [courseData, setCourseData] = useState({
        course : "",
        sem : "",
        level : ""
    })

    const [section, setSection] = useState("")
    const [course, setCourse] = useState("")
    const [gradeLevelSelect, setGradeLevelSelect] = useState("")

    const [gradeLevel, setGradeLevel] = useState<yearLevelInterface[]>([])

    const [subjects, setSubjects] = useState<subjectsInterface[]>([])

    const [subjectData, setSubjectData] = useState<sectionSubjectsInterface[]>([])


    const mutation = useMutation({
        mutationFn : (data : sectionInterface) => axios.post("section", data),
        onSuccess : () => {
            setCourse("")
            setSection("")
            setGradeLevelSelect("")
            setGradeLevel([])
            setSubjects([])
            setSubjectData([])
            successAlert("Section Added")
        },
        onError : () => {
            errorAlert("error occur")
        }
    })
 

    const selectCourse = (value : string) => {
        setCourse(value)
        setGradeLevelSelect("")
        setSubjectData([])
        setSubjects([])
        courses.map((item) => {
            if(item.code == value){
                setGradeLevel(item.year)
            }
        })
    }

    const selectGradeLevel = (value : string) => {
        setSubjectData([])
        setGradeLevelSelect(value)
     
        gradeLevel.map((item) => {
            if(`${item.level} - ${item.sem}` == value ){
                setSubjects(item.subjects)
                setCourseData({
                    course : course,
                    level : item.level,
                    sem : item.sem
                })
                item.subjects.forEach((sub) => {
                    const subjectObj : sectionSubjectsInterface = {
                        name : sub.name,
                        code : sub.code,
                        units : sub.units,
                        type : sub.type,
                        days : "",
                        start : "",
                        end : "",
                        section : section,
                        room : "",
                        instructor : "",
                    }
                    setSubjectData((prev) => [...prev, subjectObj])
                })
            }
        })
    }


    const updateSubjectData = (field : string, value : string, index : number) => {
        const data = [...subjectData]
        data[index] = {
            ...data[index] ,
            [field] : value
        }
        setSubjectData(data)
    }

    
   const submitHandler = () => {
        if(!section || !gradeLevelSelect || !course) return errorAlert("empty field")
        for(let index = 0; index < subjectData.length; index++) {
            const sub = subjectData[index];
            if (!sub.days.trim()) return errorAlert(`subject days is empty on ${sub.code}`);
            if (!sub.start.trim()) return errorAlert(`subject start is empty on  ${sub.code}`);
            if (!sub.end.trim()) return errorAlert(`subject end is empty on  ${sub.code}`);
            if (!sub.room.trim()) return errorAlert(`subject room is empty on  ${sub.code}`);
            if (!sub.instructor.trim()) return errorAlert(`subject instructor is empty on  ${sub.code}`);
        }

        const subjectFormatedTime = subjectData.map((sub) => ({...sub, start : formatToAmPm(sub.start),  end : formatToAmPm(sub.end)}))

        const sectionObj : sectionInterface = {
            course : courseData.course,
            level : courseData.level,
            sem : courseData.sem,
            subjects : subjectFormatedTime,
            student : []
        }

        mutation.mutate(sectionObj)
   }

    return(
        <div className="w-full h-full">
            <div className="w-5/6 bg-stone-50 shadow-lg m-auto mt-5  p-5 "> 

                <div className="flex gap-5">

                    <div className="w-[25%]">
                        <Label className="text-stone-500" > Section Name </Label>
                        <hr className="mb-1" />
                        <Input type="text" placeholder="ex : 21A1, 11M2, 22E1" value={section} onChange={(e) => setSection(e.target.value)}  /> 
                    </div>

                    <div className="w-[50%]">
                        <Label className="text-stone-500" > Course </Label>
                        <hr className="mb-1" />
                        <Select onValueChange={selectCourse} value={course}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course, index) => (
                                    <SelectItem key={index} value={course.code}>{course.course}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div  className="w-[25%]">
                        <Label className="text-stone-500" > Grade Level and Sem </Label>
                        <hr className="mb-1" />
                        <Select onValueChange={selectGradeLevel} value={gradeLevelSelect} disabled={gradeLevel.length == 0}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Grade Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {gradeLevel.map((course, index) => (
                                    <SelectItem key={index} value={`${course.level} - ${course.sem}`}> {course.level} - {course.sem}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <div className="mt-5">
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Days</TableHead>
                                    <TableHead>Start</TableHead>
                                    <TableHead>End</TableHead>
                                    <TableHead>Section</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead>Instructor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjectData.map((sub, index) => {

                                    return(
                                        <TableRow key={index}>
                                            <TableCell className="font-bold">{sub.code}</TableCell>
                                            <TableCell className="max-w-[220px] text-gray-500 overflow-hidden">{sub.name}</TableCell>
                                            <TableCell>{sub.units}</TableCell>
                                            <TableCell>{sub.type}</TableCell>
                                            {/*DAYS*/}
                                            <TableCell>
                                                <Input className="w-15 shadow"  value={sub.days} onChange={(e) => updateSubjectData("days", e.target.value, index)}/>
                                            </TableCell>
                                            {/*START*/}
                                            <TableCell>
                                                <Input
                                                    type="time"
                                                    id="time-picker"
                                                    value={sub.start}
                                                    onChange={(e) => updateSubjectData("start", e.target.value, index)}  
                                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                />
                                            </TableCell>
                                            {/*END*/}
                                            <TableCell>
                                                <Input
                                                    type="time"
                                                    id="time-picker"
                                                    value={sub.end}
                                                    onChange={(e) => updateSubjectData("end", e.target.value, index)} 
                                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                />
                                            </TableCell>
                                           
                                            <TableCell>{section ? <span> {section} </span> : <span className="text-red-500"> empty </span>}</TableCell>
                                            {/*ROOM */}
                                            <TableCell>
                                                <Input className="w-15 shadow"   value={sub.room} onChange={(e) => updateSubjectData("room", e.target.value, index)}  />
                                            </TableCell>

                                            {/*INSTRUVTOR*/}
                                              <TableCell className="w-62 ">
                                                <Input className="w-full shadow"   value={sub.instructor} onChange={(e) => updateSubjectData("instructor", e.target.value, index)} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                </div>
                
                <div className="mt-5 flex justify-end">
                    <Button className="" onClick={submitHandler}>  Create Section </Button>
                </div>

            </div>
        </div>
    )
}