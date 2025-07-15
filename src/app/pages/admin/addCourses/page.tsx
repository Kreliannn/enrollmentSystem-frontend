"use client"
import { useState } from "react"
import { courseInterface } from "@/app/types/courses.type"
import { convertGradeLevel } from "@/app/utils/customFunction"

export default function Page(){
    const [course, setCourse] = useState<courseInterface>({
        course: "",
        code : "",
        year: []
    })

    const [courseName, setCourseName] = useState("")
    const [courseCode, setCourseCode] = useState("")

    const addGradeLevel = () => {
        const newGradeLevel = {
            level: convertGradeLevel(course.year.length + 1),
            subjects: []
        }
        setCourse(prev => ({
            ...prev,
            year: [...prev.year, newGradeLevel]
        }))
    }

    const updateGradeLevel = (index: number, level: string) => {
        setCourse(prev => ({
            ...prev,
            year: prev.year.map((year, i) => 
                i === index ? { ...year, level } : year
            )
        }))
    }

    const addSubject = (gradeIndex: number) => {
        const newSubject = {
            name: "",
            code: "",
            units: "",
            type: ""
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
        console.log(finalCourse)
    }

    return(
        <div className="w-full h-full p-6 bg-gray-50 min-h-screen overflow-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Course</h1>
                
                {/* Course Name Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name
                    </label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course name"
                    />
                </div>


                 {/* Course code Input */}
                 <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Code
                    </label>
                    <input
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course code"
                    />
                </div>

                {/* Add Grade Level Button */}
                <div className="mb-6">
                    <button
                        onClick={addGradeLevel}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                        hidden={course.year.length >= 5}
                    >
                        Add Grade Level
                    </button>
                </div>

                {/* Grade Levels */}
                <div className="space-y-6">
                    {course.year.map((gradeLevel, gradeIndex) => (
                        <div key={gradeIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 mr-4">
                                    <label className="block  text-gray-700 mb-2 font-bold text-xl">
                                        Grade Level : {gradeLevel.level}
                                    </label>
                                    
                                </div>
                                <button
                                    onClick={() => removeGradeLevel(gradeIndex)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                    hidden={gradeIndex != course.year.length - 1 }
                                >
                                    Remove
                                </button>
                            </div>

                            {/* Subjects Section */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-medium text-gray-700">Subjects</h3>
                                    <button
                                        onClick={() => addSubject(gradeIndex)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                    >
                                        Add Subject
                                    </button>
                                </div>

                                {/* Subjects List */}
                                <div className="space-y-3">
                                    {gradeLevel.subjects.map((subject, subjectIndex) => (
                                        <div key={subjectIndex} className="bg-white p-3 rounded-md border border-gray-200">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Subject Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={subject.name}
                                                        onChange={(e) => updateSubject(gradeIndex, subjectIndex, 'name', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        placeholder="Subject name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Subject Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={subject.code}
                                                        onChange={(e) => updateSubject(gradeIndex, subjectIndex, 'code', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        placeholder="Subject code"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Units
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={subject.units}
                                                        onChange={(e) => updateSubject(gradeIndex, subjectIndex, 'units', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        placeholder="Units"
                                                        min="0"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Type
                                                    </label>
                                                    <select
                                                        value={subject.type}
                                                        onChange={(e) => updateSubject(gradeIndex, subjectIndex, 'type', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    >
                                                        <option value=""> selec type </option>
                                                        <option value="lec">Lec</option>
                                                        <option value="lab">Lab</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => removeSubject(gradeIndex, subjectIndex)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                                                  
                                                >
                                                    Remove Subject
                                                </button>
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
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        Submit Course
                    </button>
                </div>
            </div>
        </div>
    )
}

