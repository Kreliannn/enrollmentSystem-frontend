"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getCoursesInterface } from "@/app/types/courses.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { getSectionInterface } from "@/app/types/section.type"
import { SectionDisplay } from "./components/sectionDisplay"

export default function Page(){

    const [section, setSection] = useState<getSectionInterface[]>([])

    const { data } = useQuery({
      queryKey : ["sections"],
      queryFn : () => axios.get(backendUrl("/section"))
    })
  
    useEffect(() => { data?.data && setSection(data.data) }, [data])
  

    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2"> Sections </h1>
                <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>



            <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {section?.map((section, index) => (
                <div key={index} className="rounded-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md p-7">
                    <h1 className="font-bold text-lg mb-1"> {`${section.course} ${section.section}`} </h1>
                    <h2 className="font-semibold text-md text-gray-600 mb-1">  {`${section.level} ${section.sem}`}  </h2>
                    <h1 className="mb-2"> Enrolled {section.students.length} </h1>
                    <SectionDisplay section={section} />
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