"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { backendUrl } from "@/app/utils/url"
import type { getCoursesInterface } from "@/app/types/courses.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { X, Plus, GraduationCap } from "lucide-react"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { getStudentInterface } from "@/app/types/student.type"
import { CompleteReqForm } from "./components/completeReq"
import { NotCompleteReqForm } from "./components/notCompeteReq"

interface dataType {
    name : string,
    password : string,
    level : string,
    sem : string,
    course : string,
    gender : string,
    passed : string[],
    requirements: string[],
}


const requirementList = [
  "Form 138",
  "Good Moral",
  "2x2 Picture",
  "PSA",
  "SHS Diploma",
];


export default function Page() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [level, setLevel] = useState("")
  const [sem, setSem] = useState("")
  const [course, setCourse] = useState("")
  const [gender, setGender] = useState("")
  const [sub, setSub] = useState("")
  const [creditedSub, setCreditedSub] = useState<string[]>([])
  const [courses, setCourses] = useState<getCoursesInterface[]>([])

  const [requirements, setRequirements] = useState<string[]>([])

 

  const [student, setStudent] = useState<getStudentInterface | null>(null)
 


  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: () => axios.get(backendUrl("/course")),
  })

  useEffect(() => {
    data?.data && setCourses(data.data)
  }, [data])

  const mutation = useMutation({
    mutationFn : (data : dataType) => axios.post(backendUrl("/student"), data),
    onSuccess : (response) => {

        const student : getStudentInterface = response.data
        setStudent(student)
       
        successAlert("Student Account Created")
        setName("")
        setLevel("")
        setSem("")
        setCourse("")
        setGender("")
        setCreditedSub([])
        setPassword("")
        setRequirements([]) 
    },
    onError : () => {
        errorAlert("error occour")
    }
  })

  const addCreditedSub = () => {
    setCreditedSub((prev) => [...prev, sub])
    setSub("")
  }

  const submitHandler = () => {
    const studentObj : dataType = {
        name : name,
        password : password,
        level : level,
        sem : sem,
        course : course,
        gender : gender,
        passed : creditedSub,
        requirements : requirements,
    }
    mutation.mutate(studentObj)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">

      {(student) &&
        (
          (requirementList.length == requirements.length) ? <CompleteReqForm student={student}  setStudent={setStudent} /> : <NotCompleteReqForm student={student}  setStudent={setStudent} /> 
        )
      }


      {/* Header */}
      <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2"> Add Student Account </h1>
                <p className="text-gray-600">lre asdas da sd asd ble</p>
            </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card className="border-0 shadow-sm">
          <CardHeader className="">
            <CardTitle className="text-lg font-medium text-gray-900">Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter student's full name"
                    className="mt-1.5 border-gray-200 "
                  />
                </div>

                <div className="md:col-span-1">
                  <Label htmlFor="pass" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="pass"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter password"
                    className="mt-1.5 border-gray-200 "
                  />
                </div>


                <div>
                  <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="mt-1.5 border-gray-200  w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-100" />

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="course" className="text-sm font-medium text-gray-700">
                    Course
                  </Label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger className="mt-1.5 border-gray-200  w-full">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course, index) => (
                        <SelectItem key={index} value={course.code}>
                          {course.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="level" className="text-sm font-medium text-gray-700">
                    Year Level
                  </Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="mt-1.5 border-gray-200  w-full ">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st year">1st Year</SelectItem>
                      <SelectItem value="2nd year">2nd Year</SelectItem>
                      <SelectItem value="3rd year">3rd Year</SelectItem>
                      <SelectItem value="4th year">4th Year</SelectItem>
                      <SelectItem value="5th year">5th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="semester" className="text-sm font-medium text-gray-700">
                    Semester
                  </Label>
                  <Select value={sem} onValueChange={setSem}>
                    <SelectTrigger className="mt-1.5 border-gray-200  w-full">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st sem">1st Semester</SelectItem>
                      <SelectItem value="2nd sem">2nd Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-100" />


            {/* Enrollment Requirements */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Enrollment Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {requirementList.map((item, index) => (
                  <label key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      value={item}
                      checked={requirements.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRequirements((prev) => [...prev, item]);
                        } else {
                          setRequirements((prev) => prev.filter((req) => req !== item));
                        }
                      }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>


            <Separator className="bg-gray-100" />

            {/* Credited Subjects */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Credited Subjects</h3>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
                    placeholder="Enter subject code (e.g., CS101)"
                    className="border-gray-200 "
                    onKeyPress={(e) => e.key === "Enter" && sub.trim() && addCreditedSub()}
                  />
                </div>
                <Button
                  onClick={addCreditedSub}
                  disabled={!sub.trim()}
                  size="default"
                  className=" text-white px-4"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              {creditedSub.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    {creditedSub.length} subject{creditedSub.length !== 1 ? "s" : ""} added
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {creditedSub.map((sub, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 cursor-pointer transition-colors duration-200 pr-1"
                        onClick={() => setCreditedSub((prev) => prev.filter((item, itemIndex) => itemIndex !== index))}
                      >
                        {sub}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <div className="flex justify-end">
                <Button
                  onClick={submitHandler}
                  className=" text-white px-8 py-2.5 font-medium w-full"
                  disabled={!name.trim() || !course || !level || !sem || !gender || !password}
                >
                  Create Student Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
