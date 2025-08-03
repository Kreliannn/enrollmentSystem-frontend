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
import { CompleteReqForm } from "./components/completeReq"
import { NotCompleteReqForm } from "./components/notCompeteReq"


const requirementList = [
    "Form 138",
    "Good Moral",
    "2x2 Picture",
    "PSA",
    "SHS Diploma",
  ];

interface dataType {
    _id :string,
    name :string,
    studentId :string,
    course :string,
    level :string,
    sem :string,
    passed : string[],
    subjects : getSectionSubjectsInterface[],
    requirements : string[]
}

export default function Page(){

    const [requirements, setRequirements] = useState<string[]>([])


    const [student, setStudent] = useState<getStudentInterface | null>(null)

    const [studentId, setStudenetId] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const [isPrinting, setIsPrinting] = useState(false)


    const mutation = useMutation({
        mutationFn : (id : string) => axios.post(backendUrl("/student/studentId"), { id }),
        onSuccess : (response) => {
            setIsLoading(false)
            if(!response.data) return errorAlert("student id does not exist")
            if(response.data.status == "graduate") return errorAlert("student is graduate")
            if(response.data.status == "enrolled") return errorAlert("student is already Enrolled")
            if(response.data.status == "unEnrolled") return errorAlert("student has Complete requirements")
            if(response.data.balance != 0) return errorAlert("student has balance")
            const studentData : getStudentInterface = response.data
           
            setStudent(studentData)

            setRequirements(studentData.requirements)
            successAlert("student found")

        },
        onError : () => errorAlert("error occour")
    })

    const complyMutation = useMutation({
        mutationFn : (data : { id : string, requirements : string[]}) => axios.post(backendUrl("/student/comply"), data),
        onSuccess : (response) => {
          successAlert("requirementsa added")
          setStudenetId("")
          
          
          setIsPrinting(true)
        },
        onError : () => errorAlert("error occour")
    })

    const searchId = () => {
        if(!studentId.trim()) return errorAlert("provide student id")
        mutation.mutate(studentId)
        setIsLoading(true)
    }

    const addRequirements = () => {
        confirmAlert(`want to add student requirments?`, "add", () => {
            complyMutation.mutate({ id : student?._id!, requirements : requirements})
        })
    }

   

    return (
        <div className="w-full min-h-screen bg-gray-50">


          {(isPrinting && student) &&
            (
              (requirementList.length == requirements.length) ? <CompleteReqForm student={student}   setStudent={setStudent} setIsPrinting={setIsPrinting } /> : <NotCompleteReqForm requirements={requirements}  student={student}  setStudent={setStudent}  setIsPrinting={setIsPrinting }/> 
            )
          }
      
          {/* Header */}
          <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Comply Requirements</h1>
              <p className="text-gray-600 text-sm">lre asdas da sd asd</p>
            </div>
          </div>
      
          {/* Search Section */}
          <div className="flex justify-center mt-10">
            <div className="w-full max-w-md flex gap-2">
              <Input
                value={studentId}
                onChange={(e) => setStudenetId(e.target.value)}
                placeholder="Student ID"
              />
              <Button disabled={isLoading} onClick={searchId}>
                Search
              </Button>
            </div>
          </div>
      
          {/* Student Info & Requirements */}
          {student && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-10 px-6 pb-10">
              
          
          
      
              {/* Requirements */}
              <div className="bg-white p-5 rounded-lg shadow-md border w-4/6 m-auto">

              <div className="bg-white p-5 rounded-lg shadow-md border mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
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
                </div>
              </div>


                <h3 className="text-base font-medium text-gray-900 mb-3">Enrollment Requirements</h3>
                <div className="flex  gap-10">
                  {requirementList.map((item, index) => {
                    if (student.requirements.includes(item)) return null;
      
                    return (
                      <label
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          value={item}
                          checked={requirements.includes(item)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRequirements((prev) => [...prev, item]);
                            } else {
                              setRequirements((prev) =>
                                prev.filter((req) => req !== item)
                              );
                            }
                          }}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>

                <Button onClick={addRequirements} className="mt-10 w-full"> add requirements</Button>
              </div>


            </div>
          )}
        </div>
      );
      
}