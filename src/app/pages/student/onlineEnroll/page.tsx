"use client"
import { useStudentStore } from "@/app/store/studentStore"
import Enrolled from "./components/enrollDisplay"

export default function Page(){

    const { student } = useStudentStore()

    if(student?.subjects.length != 0) return <Enrolled />

    return(
        <div className="w-full h-full">
            <h1> welcome  </h1>
        </div>
    )
}
