"use client"
import { useStudentStore } from "@/app/store/studentStore"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import NotEnrolled from "./components/notEnrolled"

export default function Page(){

    const { student } = useStudentStore()

    if(student?.subjects.length == 0) return <NotEnrolled />

    return(
        <div className="w-full h-full">
           
            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2"> Student Form </h1>
                <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>

            <div className="w-4/6 mt-10 m-auto shadow-lg">


                <div className="w-full   bg-stone-50 p-4 rounded-xl">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 text-sm sm:text-base  ">
                        <div>
                        <p className="text-gray-500 font-medium text-xs">Student ID</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.studentId}</p>
                        </div>
                        <div>
                        <p className="text-gray-500 font-medium text-xs">Name</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.name}</p>
                        </div>
                        <div>
                        <p className="text-gray-500 font-medium text-xs">gender</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.gender}</p>
                        </div>
                        <div>
                        <p className="text-gray-500 font-medium text-xs">Course</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.course}</p>
                        </div>
                        <div>
                        <p className="text-gray-500 font-medium text-xs">Level</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.level}</p>
                        </div>
                        <div>
                        <p className="text-gray-500 font-medium text-xs">Semester</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.sem}</p>
                        </div>
                        <div>
                        <p className="text-gray-500 font-medium text-xs">Section</p>
                        <p className="font-semibold text-gray-800 text-sm">{student?.section}</p>
                        </div>
                    </div>
                </div>

                <div  className="bg-stone-50  p-2 rounded-lg">
                    <Table> 
                        <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Days</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Instructor</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {student?.subjects.map((sub, index) => {
                            return (
                            <TableRow key={index}>
                                <TableCell className="font-bold">{sub.code}</TableCell>
                                <TableCell className="max-w-[220px] text-gray-500 overflow-hidden">{sub.name}</TableCell>
                                <TableCell>{sub.units}</TableCell>
                                {/*DAYS*/}
                                <TableCell>
                                {sub.days}
                                </TableCell>
                                {/*START*/}
                                <TableCell>
                                {sub.start}
                                </TableCell>
                                {/*END*/}
                                <TableCell>
                                {sub.end}
                                </TableCell>
                                <TableCell>
                                {sub.section}
                                </TableCell>
                                {/*ROOM */}
                                <TableCell>
                                {sub.room}
                                </TableCell>
                                {/*INSTRUCTOR*/}
                                <TableCell className="w-62 ">
                                {sub.instructor.name}
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>

                </div>
             
            </div>
        </div>
    )
}