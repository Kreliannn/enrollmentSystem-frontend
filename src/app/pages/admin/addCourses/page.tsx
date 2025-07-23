"use client"
import { useState } from "react"
import { courseInterface } from "@/app/types/courses.type"
import { convertGradeLevel , hasDuplicates} from "@/app/utils/customFunction"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Page(){
    const [course, setCourse] = useState<courseInterface>({
        course: "",
        code : "",
        year: []
    })

    const [courseName, setCourseName] = useState("")
    const [courseCode, setCourseCode] = useState("")

   

    const mutation = useMutation({
        mutationFn : (data : courseInterface) => axios.post(backendUrl("/course"), data),
        onSuccess : () => {
            successAlert("course added")
            setCourse({
                course: "",
                code : "",
                year: []
            })
            setCourseName("")
            setCourseCode("")
        },
        onError : () => errorAlert("error occur")
    })

    const addGradeLevel = () => {
        const newGradeLevel = {
            level: convertGradeLevel(course.year.length + 1)[0],
            sem : convertGradeLevel(course.year.length + 1)[1],
            subjects: []
        }
        setCourse(prev => ({
            ...prev,
            year: [...prev.year, newGradeLevel]
        }))
    }

    const updateGradeLevel = (index: number, tuition: number) => {
        setCourse(prev => ({
            ...prev,
            year: prev.year.map((year, i) => 
                i === index ? { ...year, tuition } : year
            )
        }))
    }

    const addSubject = (gradeIndex: number) => {
        const newSubject = {
            course : courseCode,
            name: "",
            code: "",
            units: 0,
            prerequisite : ""
        }
        setCourse(prev => ({
            ...prev,
            year: prev.year.map((year, i) => 
                i === gradeIndex 
                    ? { ...year, subjects: [...year.subjects, newSubject] }
                    : year
            )
        }))
    }

    const updateSubject = (gradeIndex: number, subjectIndex: number, field: string, value: string) => {
        setCourse(prev => ({
            ...prev,
            year: prev.year.map((year, i) => 
                i === gradeIndex 
                    ? {
                        ...year,
                        subjects: year.subjects.map((subject, j) => 
                            j === subjectIndex 
                                ? { ...subject, [field]: value }
                                : subject
                        )
                    }
                    : year
            )
        }))
    }

    const removeSubject = (gradeIndex: number, subjectIndex: number) => {
        setCourse(prev => ({
            ...prev,
            year: prev.year.map((year, i) => 
                i === gradeIndex 
                    ? {
                        ...year,
                        subjects: year.subjects.filter((_, j) => j !== subjectIndex)
                    }
                    : year
            )
        }))
    }

    const removeGradeLevel = (gradeIndex: number) => {
        setCourse(prev => ({
            ...prev,
            year: prev.year.filter((_, i) => i !== gradeIndex)
        }))
    }

    const handleSubmit = () => {
        
        const finalCourse = {
            ...course,
            course: courseName,
            code : courseCode
        }

        
        if(!courseName.trim() || !courseCode.trim()) return errorAlert("course name or code is empty")
        if(course.year.length == 0) return errorAlert("grade level is empty")

        const subCode : string[] = []

        let validation = {
            isError : false,
            message : ""
        }

        
        finalCourse.year.forEach((item, index) => {
            if(item.subjects.length == 0) validation = {isError : true, message : `no subject found in ${convertGradeLevel(index + 1)}`}
            item.subjects.forEach((sub, subIndex) => {
                if(!sub.name.trim()) validation = {isError : true, message : `${convertGradeLevel(index + 1)} subjects name is empty`}
                if(!sub.code.trim()) validation = {isError : true, message : `${convertGradeLevel(index + 1)} subjects code is empty`}
                if(!sub.units) validation = {isError : true, message : `${convertGradeLevel(index + 1)} subjects unit is empty`}
                if(sub.units <= 0) validation = {isError : true, message : `${convertGradeLevel(index + 1)} subjects unit is negative or 0`}
                if(sub.units > 3) validation = {isError : true, message : `${convertGradeLevel(index + 1)} subjects unit is greater than 3`}
                if(!Number.isInteger(Number(sub.units))) validation = {isError : true, message : `${convertGradeLevel(index + 1)} subjects unit has decimal`}
                subCode.push(sub.code.trim())
            })
        })

        if(hasDuplicates(subCode)) validation = {isError : true, message : `subject code must be unique. duplication is not allowed`}

        finalCourse.year.forEach((item, index) => {
            item.subjects.forEach((sub) => {
               if(sub.prerequisite){
                    if(!subCode.includes(sub.prerequisite)) validation = {isError : true, message : `${convertGradeLevel(index + 1)} prerequisite code is not exist. please provide code that exist in this course`}
               }
            })
        })


        if(validation.isError) return errorAlert(validation.message)


        finalCourse.year.forEach((item, index) => {
            item.subjects.forEach((sub, subIndex) => {
                if(!sub.prerequisite.trim()) finalCourse.year[index].subjects[subIndex].prerequisite = "none"
            })
        })

        console.log(finalCourse)
    
        mutation.mutate(finalCourse)

    }

    return(
        <div className="w-full h-full  bg-gray-50 min-h-screen overflow-auto">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Course</h1>
                <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10 mb-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Course</h1>
                
                {/* Course Name Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name
                    </label>
                    <Input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full px-3 py-2 border"
                        placeholder="Enter course name"
                    />
                </div>


                 {/* Course code Input */}
                 <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Code
                    </label>
                    <Input
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="w-full px-3 py-2"
                        placeholder="Enter course code"
                    />
                </div>

                {/* Add Grade Level Button */}
                <div className="mb-6">
                    <Button
                        onClick={addGradeLevel}
                        className=" text-white px-4 py-2 rounded-md transition-colors"
                        hidden={course.year.length >= 10}
                    >
                      <Plus /> Add Grade Level
                    </Button>
                </div>

                {/* Grade Levels */}
                <div className="space-y-6">
                    {course.year.map((gradeLevel, gradeIndex) => (
                        <div key={gradeIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 mr-4">

                                    <label className="block  text-gray-700 mb-1 font-bold text-xl">
                                        Grade Level : {gradeLevel.level}
                                        <span className="  text-gray-400 mb-2 font-bold ">  {gradeLevel.sem}</span>
                                    </label>
                                 

                                   
                                    
                                </div>
                                <Button variant="destructive" size="icon" className="hover:bg-red-700"  onClick={() => removeGradeLevel(gradeIndex)} hidden={gradeIndex != course.year.length - 1 } >
                                    <X />
                                </Button>
                               
                            </div>

                            <hr  className="mb-3"/>

                            {/* Subjects Section */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-bold   text-gray-700">Subjects:</h3>
                                    <Button
                                        onClick={() => addSubject(gradeIndex)}
                                        className=" text-white px-3 py-1 rounded-md text-sm transition-colors"
                                    >
                                         <Plus />  Add Subject
                                    </Button>
                                </div>

                                {/* Subjects List */}
                                <div className="space-y-3">
                                    {gradeLevel.subjects.map((subject, subjectIndex) => (
                                        <div key={subjectIndex} className="bg-white p-3 rounded-md border border-gray-200">
                                           <div className="grid grid-cols-[repeat(4,_1fr)_auto] gap-3 mb-2">
                                                {/* Subject Name */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Subject Name
                                                    </label>
                                                    <Input
                                                    type="text"
                                                    value={subject.name}
                                                    onChange={(e) =>
                                                        updateSubject(gradeIndex, subjectIndex, "name", e.target.value)
                                                    }
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="Subject name"
                                                    />
                                                </div>

                                                {/* Subject Code */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Subject Code
                                                    </label>
                                                    <Input
                                                    type="text"
                                                    value={subject.code}
                                                    onChange={(e) =>
                                                        updateSubject(gradeIndex, subjectIndex, "code", e.target.value.trim())
                                                    }
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="Subject code"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    prerequisite
                                                    </label>
                                                    <Input
                                                    type="text"
                                                    disabled={gradeIndex == 0}
                                                    value={subject.prerequisite}
                                                    onChange={(e) =>
                                                        updateSubject(gradeIndex, subjectIndex, "prerequisite", e.target.value.trim())
                                                    }
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="(not required)"
                                                    />
                                                </div>

                                                {/* Units */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Units
                                                    </label>
                                                    <Input
                                                    type="number"
                                                    value={subject.units}
                                                    onChange={(e) =>
                                                        updateSubject(gradeIndex, subjectIndex, "units", e.target.value)
                                                    }
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="Units"
                                                    min="0"
                                                    />
                                                </div>

                                             

                                                {/* X Button */}
                                                <div className="flex items-end">
                                                    <Button variant="destructive" size="icon" className="hover:bg-red-700"  onClick={() => removeSubject(gradeIndex, subjectIndex)}>
                                                        <X />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        className=" text-white px-6 py-2 rounded-md font-medium transition-colors w-full"
                    >
                        Submit Course
                    </Button>
                </div>
            </div>
        </div>
    )
}

