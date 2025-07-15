"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getCoursesInterface } from "@/app/types/courses.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { SubjectDisplay } from "./components/subjectDisplay"

export default function Page() {
  const [courses, setCourses] = useState<getCoursesInterface[]>([])

  const { data } = useQuery({
    queryKey : ["courses"],
    queryFn : () => axios.get(backendUrl("/course"))
  })

  useEffect(() => { data?.data && setCourses(data.data) }, [data])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header Section */}
      <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Courses</h1>
          <p className="text-gray-600">Explore our comprehensive course offerings</p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {course.course}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-gray-500 bg-gray-100 border px-3 py-1 rounded-full inline-block w-fit">
                  {course.code}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-600 mb-2">Grade Levels:</div>
                  <div className="flex flex-wrap gap-2">
                    {course.year.map((year, yearIndex) => (
                      <SubjectDisplay key={yearIndex} year={year} course={course.course} code={course.code} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-2">No courses available</div>
            <p className="text-gray-500">Check back later for new course offerings</p>
          </div>
        )}
      </div>
    </div>
  )
}