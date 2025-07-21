"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery  } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { successAlert, errorAlert } from "@/app/utils/alert"
import { getSectionInterface } from "@/app/types/section.type"
import { getStudentInterface } from "@/app/types/student.type"
import { confirmAlert } from "@/app/utils/alert"
import Swal from "sweetalert2"

export default function Page(){


    const [student, setStudent] = useState<getStudentInterface | null>(null)

    const [payment, setPayment] = useState(0)

    const [studentId, setStudenetId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const mutation = useMutation({
        mutationFn : (id : string) => axios.post(backendUrl("/student/studentId"), { id }),
        onSuccess : (response) => {
            setIsLoading(false)
            if(!response.data) return errorAlert("student id does not exist")
            const studentData : getStudentInterface = response.data
            if(studentData.status != "enrolled") return errorAlert("student is not enrolled")
            if(studentData.balance == 0) return errorAlert("student already fully paid")
            setStudent(response.data)
            successAlert("student found")
        },
        onError : () => errorAlert("error occour")
    })

    const payMutation = useMutation({
        mutationFn : (data : { id : string, payment : number}) => axios.post(backendUrl("/student/pay"), data),
        onSuccess : (response) => {
          Swal.fire( `${student?.studentId} Balance is  ${response.data.balance.toLocaleString()}`, 'Payment Success', 'success')
          setStudenetId("")
          setStudent(null)
          setPayment(0)
        },
        onError : () => errorAlert("error occour")
    })

    const searchId = () => {
        if(!studentId.trim()) return errorAlert("provide student id")
        mutation.mutate(studentId)
        setIsLoading(true)
    }

    const payHandler = () => {
        confirmAlert(`student Pay ₱${payment}`, "Proceed", () => {
            if(!student) return
            payMutation.mutate({ id : student?._id, payment : payment})
        })
    }


    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> Tuition Payment  </h1>
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

                {student && (
                    <div className="m-auto  w-4/6 mt-10">
                       <div className="w-full shadow-lg mb-10 bg-stone-50 p-4 rounded-xl">

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm sm:text-base">
                            <div>
                                <p className="text-gray-500 font-medium">Student ID</p>
                                <p className="font-semibold text-gray-800">{student.studentId}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium">Name</p>
                                <p className="font-semibold text-gray-800">{student.name}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium">Course</p>
                                <p className="font-semibold text-gray-800">{student.course}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium">Level</p>
                                <p className="font-semibold text-gray-800">{student.level}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium">Semester</p>
                                <p className="font-semibold text-gray-800">{student.sem}</p>
                                </div>
                                <div>
                                <p className="text-gray-500 font-medium">Balance</p>
                                <p className="font-semibold text-green-500"> ₱{student.balance.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full shadow-lg mb-10 bg-stone-50 p-6 rounded-2xl">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Payment:</label>
                            <div className="flex gap-3 items-center">
                                <Input
                                    value={payment}
                                    onChange={(e) => setPayment(Number(e.target.value))}
                                    type="number"
                                    placeholder="Enter amount"
                                    className="flex-1 h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                                <Button 
                                    className="h-10 px-5 rounded-lg"
                                    disabled={(payment > student.balance) || (payment <=  0)}
                                    onClick={payHandler}
                                >
                                    Enter
                                </Button>
                            </div>
                        </div>


                    </div>
                )}
               
                
            </div>

        </div>
    )
}