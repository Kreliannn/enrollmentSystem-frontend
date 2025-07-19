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

export default function Page(){


    const [section, setSection] = useState<getSectionInterface[]>([])

    const { data } = useQuery({
      queryKey : ["sections"],
      queryFn : () => axios.get(backendUrl("/section"))
    })
  
    useEffect(() => { data?.data && setSection(data.data) }, [data])

    const [availableSection, setAvailableSection] = useState<getSectionInterface[]>([])

    const [studentId, setStudenetId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const mutation = useMutation({
        mutationFn : (id : string) => axios.post(backendUrl("/student/studentId"), { id }),
        onSuccess : (response) => {
            setIsLoading(false)
            if(!response.data) return errorAlert("student id does not exist")
            const student : getStudentInterface = response.data
            successAlert("student found")
            setStudenetId("")
            setAvailableSection(section.filter((item) => (item.course == student.course && item.sem == student.sem && item.level == student.level )))
        },
        onError : () => errorAlert("error occour")
    })

    const searchId = () => {
        if(!studentId.trim()) return errorAlert("provide student id")
        mutation.mutate(studentId)
        setIsLoading(true)
    }


    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> Enroll Student </h1>
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


                <div className="m-auto  w-4/6 mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                        {availableSection?.map((section, index) => (
                            <div key={index} className="rounded-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md p-7">
                                <h1 className="font-bold text-lg mb-1"> {`${section.course} ${section.section}`} </h1>
                                <h2 className="font-semibold text-md text-gray-600 mb-1">  {`${section.level} ${section.sem}`}  </h2>
                                <h1 className="mb-2"> Enrolled {section.students.length} </h1>
                                <Button className="w-full"> visit </Button>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>

        </div>
    )
}