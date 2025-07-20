"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery  } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { successAlert, errorAlert } from "@/app/utils/alert"
import { getSectionInterface, getSectionSubjectsInterface } from "@/app/types/section.type"
import { getStudentInterface } from "@/app/types/student.type"
import { confirmAlert } from "@/app/utils/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { subjectAvailability } from "@/app/utils/customFunction"
import { X } from "lucide-react"

interface dataType {
    name :string,
    studentId :string,
    course :string,
    level :string,
    sem :string,
    passed : string[],
    subjects : getSectionSubjectsInterface[]
}

export default function Page(){


    const [section, setSection] = useState<getSectionInterface[]>([])

    const { data } = useQuery({
      queryKey : ["sections"],
      queryFn : () => axios.get(backendUrl("/section"))
    })
  
    useEffect(() => { data?.data && setSection(data.data) }, [data])

    const [availableSection, setAvailableSection] = useState<getSectionInterface[]>([])
    const [viewSection, setViewSection] = useState<getSectionInterface[]>([])

    const [subjects, setSubjects] = useState<getSectionSubjectsInterface[]>([])

    const [student, setStudent] = useState<dataType>({
        name : "",
        studentId : "",
        course : "",
        level : "",
        sem : "",
        passed : [],
        subjects : []
    })

    const [studentId, setStudenetId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [sectionYear, setSectionYear] = useState("1st year")

    const mutation = useMutation({
        mutationFn : (id : string) => axios.post(backendUrl("/student/studentId"), { id }),
        onSuccess : (response) => {
            setIsLoading(false)
            if(!response.data) return errorAlert("student id does not exist")
            const studentData : getStudentInterface = response.data
            if(studentData.section != "none") return errorAlert("student is already enrolled")
            setStudent({
                name : studentData.name,
                studentId : studentData.studentId,
                course : studentData.course,
                level : studentData.level,
                sem : studentData.sem,
                passed : studentData.passed,
                subjects : studentData.subjects
            })
            successAlert("student found")
            setAvailableSection(section.filter((item) => (item.course == studentData.course)))
            setViewSection(section.filter((item) => (item.course == studentData.course && item.level == sectionYear)))
        },
        onError : () => errorAlert("error occour")
    })

    const enrollStudentMutation = useMutation({
        mutationFn : (data : { studentId : string, subjects : getSectionSubjectsInterface[]}) => axios.post(backendUrl("/student/irregEnroll"), data),
        onSuccess : (response) => {
          successAlert("Subject Added")
          setStudenetId("")
          setStudent({
            name : "",
            studentId : "",
            course : "",
            level : "",
            sem : "",
            passed : [],
            subjects : []
        })
        setViewSection([])
        setAvailableSection([])
        setSubjects([])
        setSectionYear("1st year")
        },
        onError : () => errorAlert("error occour")
    })

    const searchId = () => {
        if(!studentId.trim()) return errorAlert("provide student id")
        mutation.mutate(studentId)
        setIsLoading(true)
    }

    const enrollStudent = () => {
        confirmAlert(`are you sure?`, "enroll", () => {
            enrollStudentMutation.mutate({ studentId : student.studentId, subjects : subjects})
        })
    }

    const changeSectionView = (value : string) => {
        setSectionYear(value)
        setViewSection(availableSection.filter((item) => item.level == value))
    }

    const addSubject = (subject : getSectionSubjectsInterface) => {
        setSubjects(prev => [...prev, subject])
    }

    const removeSubject = (code : string) => {
        setSubjects(prev => prev.filter((sub) => sub.code != code ))
    }


    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> Enroll Irregular Student </h1>
                    <p className="text-gray-600">lre asdas da sd asd</p>
                </div>  
            </div>

            <div>

                <div className="m-auto  w-2/6 mt-10">
                    <div className="m-auto flex gap-2 w-full">
                        <Input 
                            value={studentId}
                            onChange={(e) => setStudenetId(e.target.value)}
                            placeholder="Student Id"
                        />
                        <Button
                            disabled={isLoading}
                            onClick={searchId}
                        >
                            Search
                        </Button>
                    </div>
                </div>

                

                {availableSection.length != 0 && (
                    <div className="grid grid-cols-2 gap-5 mt-5">


                        <div className="p-5  rounded-lg ms-5 " >
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm sm:text-base bg-stone-50 p-2 shadow-lg rounded-lg">
                                    <div>
                                    <p className="text-gray-500 font-medium text-xs">Student ID</p>
                                    <p className="font-semibold text-gray-800 text-sm">{student.studentId}</p>
                                    </div>
                                    <div>
                                    <p className="text-gray-500 font-medium text-xs">Name</p>
                                    <p className="font-semibold text-gray-800 text-sm">{student.name}</p>
                                    </div>
                                    <div>
                                    <p className="text-gray-500 font-medium text-xs">Course</p>
                                    <p className="font-semibold text-gray-800 text-sm">{student.course}</p>
                                    </div>
                                    <div>
                                    <p className="text-gray-500 font-medium text-xs">Level</p>
                                    <p className="font-semibold text-gray-800 text-sm">{student.level}</p>
                                    </div>
                                    <div>
                                    <p className="text-gray-500 font-medium text-xs">Semester</p>
                                    <p className="font-semibold text-gray-800 text-sm">{student.sem}</p>
                                    </div>
                                </div>

                                <div className="gap-6 mt-5 h-[370px] bg-stone-50 shadow-lg p-2 rounded-lg overflow-auto relative">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Code</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Section</TableHead>
                                                <TableHead>Days</TableHead>
                                                <TableHead>Start</TableHead>
                                                <TableHead>End</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {subjects.map((sub, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-bold">{sub.code}</TableCell>
                                                        <TableCell className="max-w-[220px] text-gray-500 overflow-hidden">{sub.name}</TableCell>
                                                        <TableCell>{sub.section}</TableCell>
                                                        {/*DAYS*/}
                                                        <TableCell>
                                                            {sub.days}
                                                        </TableCell>
                                                        {/*START*/}
                                                        <TableCell>
                                                            {sub.start}
                                                        </TableCell>
                                                        {/*END*/}
                                                        <TableCell>
                                                            {sub.end}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button size={"sm"} onClick={() => removeSubject(sub.code)}>
                                                                <X />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                    

                                    <Button className="w-5/6 absolute bottom-3 left-[40px] shadow-lg" onClick={enrollStudent}>
                                            Enroll
                                    </Button>
                                </div>
                        </div>

                        <div className="p-2  rounded-lg">
                            <div className="mb-5">
                                <div>
                          
                                    <Select value={sectionYear} onValueChange={changeSectionView}>
                                        <SelectTrigger className="mt-1.5 border-gray-200  w-full">
                                        <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st year">1st year</SelectItem>
                                            <SelectItem value="2nd year">2nd year</SelectItem>
                                            <SelectItem value="3rd year">3rd year</SelectItem>
                                            <SelectItem value="4th year">4th year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6   h-[400px] overflow-auto">
                                {viewSection?.map((section, index) => (
                                    <div key={index} className="bg-stone-50 rounded-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1  border-0 shadow-md p-7">
                                        <div className="flex gap-10 justify-between">
                                            <h1 className="font-bold text-lg mb-1"> {`${section.course} ${section.section}`} </h1>
                                            <h2 className="font-semibold text-md text-gray-600 mb-1">  {`${section.level} ${section.sem}`}  </h2>
                                        </div>
                                    

                                        <div className="gap-6 mb-6">
                                            <Table>
                                                <TableHeader>
                                                <TableRow>
                                                    <TableHead>Code</TableHead>
                                                    <TableHead>Subject</TableHead>
                                                    <TableHead>Prerequisite</TableHead>
                                                    <TableHead>Days</TableHead>
                                                    <TableHead>Start</TableHead>
                                                    <TableHead>End</TableHead>
                                                    <TableHead>Add</TableHead>
                                                </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                {section.subjects.map((sub, index) => {
                                                    return (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-bold">{sub.code}</TableCell>
                                                        <TableCell className="max-w-[220px] text-gray-500 overflow-hidden">{sub.name}</TableCell>
                                                        <TableCell>{sub.prerequisite}</TableCell>
                                                        {/*DAYS*/}
                                                        <TableCell>
                                                        {sub.days}
                                                        </TableCell>
                                                        {/*START*/}
                                                        <TableCell>
                                                        {sub.start}
                                                        </TableCell>
                                                        {/*END*/}
                                                        <TableCell>
                                                        {sub.end}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button size={"sm"} onClick={() => addSubject(sub)} disabled={subjectAvailability(sub, subjects, student.passed, student.subjects)}>
                                                                <Plus /> 
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    );
                                                })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>

                    </div>
                    
                )}
               
                
            </div>

        </div>
    )
}