"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useProfStore } from "@/app/store/profStore"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ClassList } from "./components/classList"

export default function Page(){

    const { prof } = useProfStore()
        
    console.log(prof)

    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Schedules</h1>
                <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>
           
            <div className="w-full">
                <div className="w-4/6 shadow-lg p-5 m-auto mt-10 min-h-[500px] overflow-auto">
                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Days</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead className="text-end">View  Class List</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prof?.schedules.map((sub, index) => (
                                <TableRow key={index}>
                                    <TableCell >{sub.course}</TableCell>
                                    <TableCell className="font-bold">{sub.section}</TableCell>
                                    <TableCell>{sub.code}</TableCell>
                                    <TableCell className="max-w-[250px]  text-gray-500  overflow-hidden">{sub.name}</TableCell>
                                    <TableCell>{sub.days}</TableCell>
                                    <TableCell>{sub.start}</TableCell>
                                    <TableCell>{sub.end}</TableCell>
                                    <TableCell>{sub.room}</TableCell>
                                    <TableCell className="text-end">
                                        <ClassList subject={sub} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </div>
            </div>


        </div>
    )
}