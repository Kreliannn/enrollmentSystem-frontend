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

export default function Page(){

    const [courses, setCourses] = useState<getCoursesInterface[]>([])

    const { data } = useQuery({
        queryKey : ["courses"],
        queryFn : () => axios.get(backendUrl("/course"))
    })
    
    useEffect(() => { data?.data && setCourses(data.data) }, [data])

    const [section, setSection] = useState("")
    const [course, setCourse] = useState("")
    const [gradeLevelSelect, setGradeLevelSelect] = useState("")

    const [gradeLevel, setGradeLevel] = useState<yearLevelInterface[]>([])

    const [subjects, setSubjects] = useState<subjectsInterface[]>([])
 

    const selectCourse = (value : string) => {
        setCourse(value)
        setGradeLevelSelect("")
        setSubjects([])
        courses.map((item) => {
            if(item.code == value){
                setGradeLevel(item.year)
            }
        })
    }

    const selectGradeLevel = (value : string) => {
        setGradeLevelSelect(value)
        gradeLevel.map((item) => {
            if(item.level == value){
                setSubjects(item.subjects)
            }
        })
    }

    
   

    return(
        <div className="w-full h-full">
            <div className="w-4/6 bg-stone-50 shadow-lg m-auto mt-5  p-5 "> 

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
                                    <SelectItem key={index} value={course.level}>{course.level}</SelectItem>
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
                                {subjects.map((sub, index) => {

                                    return(
                                        <TableRow key={index}>
                                            <TableCell className="font-bold">{sub.code}</TableCell>
                                            <TableCell className="max-w-[250px] text-gray-500 overflow-hidden">{sub.name}</TableCell>
                                            <TableCell>{sub.units}</TableCell>
                                            <TableCell>{sub.type}</TableCell>
                                            {/*DAYS*/}
                                            <TableCell>
                                                <Input className="w-15 shadow" />
                                            </TableCell>
                                            {/*START*/}
                                            <TableCell>
                                                <Input className="w-15 shadow" />
                                            </TableCell>
                                            {/*END*/}
                                            <TableCell>
                                                <Input className="w-15 shadow" />
                                            </TableCell>
                                           
                                            <TableCell>{section ? <span> {section} </span> : <span className="text-red-500"> empty </span>}</TableCell>
                                            {/*ROOM */}
                                            <TableCell>
                                                <Input className="w-15 shadow" />
                                            </TableCell>

                                            {/*END*/}
                                              <TableCell>
                                                <Input className="w-15 shadow" />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                </div>
                

            </div>
        </div>
    )
}