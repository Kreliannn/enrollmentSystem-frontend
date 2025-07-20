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
import { X , Printer} from "lucide-react"


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

    const [student, setStudent] = useState<getStudentInterface | null>(null)

    const [studentId, setStudenetId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [isPrinted, setIsPrinted] = useState(false)

    const mutation = useMutation({
        mutationFn : (id : string) => axios.post(backendUrl("/student/studentId"), { id }),
        onSuccess : (response) => {
            setIsLoading(false)
            if(!response.data) return errorAlert("student id does not exist")
            if(response.data.status == "enrolled") return errorAlert("student is already Enrolled")
            if(response.data.status != "For Printing") return errorAlert("student is not for printing")
            const studentData : getStudentInterface = response.data
            setStudent(response.data)
            successAlert("student found")
        },
        onError : () => errorAlert("error occour")
    })

    const searchId = () => {
        if(!studentId.trim()) return errorAlert("provide student id")
        mutation.mutate(studentId)
        setIsLoading(true)
    }

    const printForm = () => {
        // Add print styles to hide non-printable elements
        const printStyles = `
            <style>
                @media print {
                    body * { visibility: hidden; }
                    .printable-area, .printable-area * { visibility: visible; }
                    .printable-area { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%; 
                    }
                    .no-print { display: none !important; }
                    .print-header {
                        text-align: center;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #000;
                        padding-bottom: 10px;
                    }
                    .student-info {
                        padding: 10px;
                        border: 1px solid black;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                    }
                    th, td { 
                        border: 1px solid #000; 
                        padding: 8px; 
                        text-align: left; 
                        font-size: 12px;
                    }
                    th { 
                        background-color: #f5f5f5; 
                        font-weight: bold; 
                    }
                }
            </style>
        `
        
        // Add the print styles to the document head
        const existingPrintStyles = document.getElementById('print-styles')
        if (existingPrintStyles) {
            existingPrintStyles.remove()
        }
        
        const styleElement = document.createElement('div')
        styleElement.id = 'print-styles'
        styleElement.innerHTML = printStyles
        document.head.appendChild(styleElement)
        
        // Trigger the print dialog
        window.print()
        
        // Set printed state after a brief delay
        setTimeout(() => {
            setIsPrinted(true)
            successAlert("Student can proceed to Enroll")
        }, 500)
        
        // Clean up print styles after printing
        setTimeout(() => {
            const printStylesElement = document.getElementById('print-styles')
            if (printStylesElement) {
                printStylesElement.remove()
            }
        }, 1000)
    }

    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center no-print">
                <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2"> Print Student Form  </h1>
                <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>


            <div className="m-auto  w-2/6 mt-10 no-print">
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

            {/* print  this */}
            { student && (
                <div className="printable-area">
                    {/* Print Header - only visible when printing */}
                    <div className="print-header hidden print:block">
                        <h1 className="text-2xl font-bold">Student Enrollment Form</h1>
                        <p>Academic Year 2024-2025</p>
                    </div>

                    <div className="w-4/6 mt-10 m-auto shadow-lg print:w-full print:shadow-none">

                        <div className="w-full bg-stone-50 p-4 rounded-xl student-info print:rounded-none">
                            <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-4 text-sm sm:text-base">
                                <div>
                                <p className="text-gray-500 font-medium text-xs">Student ID</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.studentId}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium text-xs">Name</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.name}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium text-xs">gender</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.gender}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium text-xs">Course</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.course}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium text-xs">Level</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.level}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium text-xs">Semester</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.sem}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium text-xs">Section</p>
                                <p className="font-semibold text-gray-800 text-sm">{student?.section}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-50 shadow-lg p-2 rounded-lg">
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Days</TableHead>
                                    <TableHead>Start</TableHead>
                                    <TableHead>End</TableHead>
                                    <TableHead>Section</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead>Instructor</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {student?.subjects.map((sub, index) => {
                                    return (
                                    <TableRow key={index}>
                                        <TableCell className="font-bold">{sub.code}</TableCell>
                                        <TableCell className="max-w-[220px] text-gray-500 overflow-hidden">{sub.name}</TableCell>
                                        <TableCell>{sub.units}</TableCell>
                                        <TableCell>{sub.days}</TableCell>
                                        <TableCell>{sub.start}</TableCell>
                                        <TableCell>{sub.end}</TableCell>
                                        <TableCell>{sub.section}</TableCell>
                                        <TableCell>{sub.room}</TableCell>
                                        <TableCell className="w-62 ">{sub.instructor.name}</TableCell>
                                    </TableRow>
                                    );
                                })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            ) }

            {student && (
                <div className="w-4/6 m-auto h-10 mt-10 flex justify-end gap-2 no-print">
                    <Button onClick={printForm}>
                        <Printer />
                        Print Form 
                    </Button>

                    <Button className="bg-green-500 hover:bg-green-600 shadow" disabled={!isPrinted}> 
                        Enroll Student 
                    </Button>
                </div>
            )}

        </div>
    )
}