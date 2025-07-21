"use client"
import { useStudentStore } from "@/app/store/studentStore"
import Enrolled from "./components/enrollDisplay"
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
import { SectionDisplay } from "./components/sectionDisplay"

export default function Page(){

    const { student, setStudent } = useStudentStore()

    const [section, setSection] = useState<getSectionInterface[]>([])


    const { data } = useQuery({
      queryKey : ["sections"],
      queryFn : () => axios.get(backendUrl("/section")),
      refetchInterval: 5000,
    })
  
    useEffect(() => { data?.data && setSection(data.data) }, [data])

    const [availableSection, setAvailableSection] = useState<getSectionInterface[]>([])


    useEffect(() => {
        if(section.length != 0){
            setAvailableSection(section.filter((item) => (item.course == student?.course && item.sem == student?.sem && item.level == student?.level )))  
        }
    }, [section])
    

    const enrollStudentMutation = useMutation({
        mutationFn : (data : { studentId : string, sectionId : string}) => axios.post(backendUrl("/student/enroll"), data),
        onSuccess : (response) => {
          successAlert("student enrolled")
          setStudent(response.data)
          setAvailableSection([])
        },
        onError : () => errorAlert("error occour")
    })


    const enrollStudent = (section : getSectionInterface) => {
        confirmAlert(`are you sure  you want to enroll to ${section.section}`, "enroll", () => {
            if(!student?.studentId  ) return 
            enrollStudentMutation.mutate({ studentId : student.studentId, sectionId : section._id})
        })
    }

    if(student?.subjects.length != 0) return <Enrolled />

    return(
        <div className="w-full h-full">
            
            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> Online Enrollment  </h1>
                    <p className="text-gray-600">lre asdas da sd asd</p>
                </div>  
            </div>

            <div>
            {availableSection.length != 0 && (
                    <div className="m-auto  w-4/6 mt-10">
                       <div className="w-full shadow-lg mb-10 bg-stone-50 p-4 rounded-xl">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm sm:text-base">
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
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {availableSection?.map((section, index) => (
                                <div key={index} className="bg-stone-50 rounded-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1  border-0 shadow-md p-7">
                                    <h1 className="font-bold text-lg mb-1"> {`${section.course} ${section.section}`} </h1>
                                    <h2 className="font-semibold text-md text-gray-600 mb-1">  {`${section.level} ${section.sem}`}  </h2>
                                    <h1 className="mb-2" > Enrolled : {section.students.length} </h1>
                                    <div className="flex gap-2">
                                        <SectionDisplay section={section} passed={student.passed} />
                                        <Button onClick={() => enrollStudent(section)} className=" bg-green-500 hover:bg-green-600 shadow" > Enroll </Button>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>



        </div>
    )
}
