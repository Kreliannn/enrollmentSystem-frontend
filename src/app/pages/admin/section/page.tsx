"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getCoursesInterface } from "@/app/types/courses.type"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { getSectionInterface } from "@/app/types/section.type"
import { SectionDisplay } from "./components/sectionDisplay"
import { X } from "lucide-react"
import { confirmAlert , successAlert, errorAlert} from "@/app/utils/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function Page(){

    const [section, setSection] = useState<getSectionInterface[]>([])
    const [sectionView, setSectionView] = useState<getSectionInterface[]>([])
    const [courses, setcourses] = useState<string[]>([])
    const [course, setcourse] = useState<string>("all")

    const { data } = useQuery({
      queryKey : ["sections"],
      queryFn : () => axios.get(backendUrl("/section"))
    })

    useEffect(() => { 
        if(data?.data){
            setSection(data.data) 
            setSectionView(data.data) 
            setcourses([...new Set(data.data.map((section : getSectionInterface ) => section.course))] as string[]) ;
        } 
    }, [data])

    const mutation = useMutation({
        mutationFn : (sectionId : string) => axios.delete(backendUrl("/section/" + sectionId)), 
        onSuccess : (response) => {  
            successAlert("section removed")
            setSection(response.data)
            setSectionView(response.data)
            setcourse("all")
        },
        onError : () => errorAlert("error accour"),
    })


    const handleDeleteSection = (secionId : string, course : string,  section : string,  ) => {
        confirmAlert(`you want to remove ${course} ${section}`, "remove", () => {
            mutation.mutate(secionId)
        })
    }
    
    const handleFilterByCourse = (value : string) => {
        setcourse(value)
        if(value == "all") return setSectionView(section)
        setSectionView(section.filter(item => item.course == value))
    }

    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2"> Sections </h1>
                <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>



            <div className="container mx-auto px-6 py-8">

            <div className="w-[15%]  mb-5">
                <Label className="text-stone-500" > Filter By Course </Label>
                <hr className="mb-1" />
                <Select onValueChange={handleFilterByCourse} value={course}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem  value={"all"}>{"all"}</SelectItem>
                        {courses.map((course, index) => (
                            <SelectItem key={index} value={course}>{course}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {sectionView?.map((section, index) => (
                <div key={index} className="relative rounded-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md p-7">
                    <h1 className="font-bold text-lg mb-1"> {`${section.course} ${section.section}`} </h1>
                    <h2 className="font-semibold text-md text-gray-600 mb-1">  {`${section.level} ${section.sem}`}  </h2>
                    <h1 className="mb-2"> Enrolled {section.students.length} </h1>
              
                    <SectionDisplay section={section} />

                    <Button 
                     variant={"outline"}
                     hidden={section.students.length != 0}
                     className="absolute top-5 right-2 "
                     size={"icon"}
                     onClick={() => handleDeleteSection(section._id, section.course, section.section)}
                    >
                        <X className="text-red-500 hover:text-red-700" />
                    </Button>
                   
                </div>
            ))}
            </div>

            {/* Empty State */}
            {section.length === 0 && (
            <div className="text-center py-16">
                <div className="text-gray-400 text-lg mb-2">No courses available</div>
                <p className="text-gray-500">Check back later for new course offerings</p>
            </div>
            )}
        </div>

        </div>
    )
}