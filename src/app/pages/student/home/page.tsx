"use client"
import { useStudentStore } from "@/app/store/studentStore"
import { User, BookOpen, CheckCircle, XCircle, Calendar, Users } from "lucide-react"
import { DisplaySubCode } from "./components/displaySubjectCode"
import { Wallet } from "lucide-react";

export default function Page(){
    const { student } = useStudentStore()

    if (!student) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Loading student data...</p>
            </div>
        )
    }

    const getStatusColor = (status : string) => {
        switch(status) {
            case "enrolled": return "bg-green-100 text-green-800 border-green-200"
            case "For Printing": return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "unEnrolled": return "bg-red-100 text-red-800 border-red-200"
            default: return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const totalSubjects = student.subjects?.length || 0
    const totalPassed = student.passed?.length || 0
    const totalFailed = student.failed?.length || 0

    return(
        <div className="w-full min-h-screen bg-gray-50 "> 

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center ">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> Student Dashboard  </h1>
                    <p className="text-gray-600">lre asdas da sd asd</p>
                </div>  
            </div>
                 
            <div className="max-w-6xl mx-auto mt-10">
                {/* Header */}
             

                {/* Student Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <User className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Student ID</p>
                                <p className="font-medium text-gray-900">{student.studentId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium text-gray-900 capitalize">{student.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Course</p>
                                <p className="font-medium text-gray-900 uppercase">{student.course}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Info Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                            <Calendar className="h-6 w-6 text-green-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Academic Details</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Year Level</p>
                                <p className="font-medium text-gray-900 capitalize">{student.level}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Semester</p>
                                <p className="font-medium text-gray-900 capitalize">{student.sem}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Section</p>
                                <p className="font-medium text-gray-900 uppercase">{student.section}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Card */}
               
                </div>

                {/* Academic Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Subjects */}

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-center mb-2">
                            <Users className="h-4 w-4 text-purple-600 mr-2" />
                            <h2 className="text-md font-semibold text-gray-900">Enrollment Status</h2>
                        </div>
                        <div className="flex items-center justify-center py-4">
                            <span className={`px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(student.status)}`}>
                                {student.status}
                            </span>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-5xl font-bold text-red-600 mb-5">₱{student.balance}</p>
                                <p className="text-lg text-gray-600">Balance </p>
                            </div>
                            <Wallet className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
            

                    {/* Passed Subjects */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative hover:bg-stone-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-5xl font-bold text-green-600 mb-5">{totalPassed}</p>
                                <p className="text-lg text-gray-600">Passed Subjects</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>

                        <DisplaySubCode  title={"passed"} description={"subject you passed"} sub={student?.passed}/>
                    </div>

                    {/* Failed Subjects */}
                  
                </div>

                {/* Current Subjects */}
                {student.subjects && student.subjects.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-center mb-6">
                            <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Current Subjects</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {student.subjects.map((subject, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <p className="font-medium text-gray-900">{subject.name || `Subject ${index + 1}`}</p>
                                    {subject.code && (
                                        <p className="text-sm text-gray-500">{subject.code}</p>
                                    )}
                                    {subject.units && (
                                        <p className="text-sm text-gray-600">{subject.units} units</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}





