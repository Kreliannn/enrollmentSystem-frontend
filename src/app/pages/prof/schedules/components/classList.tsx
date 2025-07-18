"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { yearLevelInterface } from "@/app/types/courses.type"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { sectionSubjectsInterface } from "@/app/types/section.type"
 import { Eye, TableCellsMerge } from "lucide-react"
 import { confirmAlert, successAlert } from "@/app/utils/alert"


 const data = [
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
    { studentId : "2025-0001", studentName : "krelianq uimson"},
 ]

export function ClassList({ section } : { section : sectionSubjectsInterface }) {

  const [open, setOpen] = useState(false);

  const failedHandler = (name : string) => {
    setOpen(false)
    confirmAlert(`are you sure ${name} is failed on subject ${section.name}?`, "failed", () => {
        successAlert("falied")
    })
  }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs"> 
             Class List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> {section.course} {section.section} </DialogTitle>
          <DialogDescription>   
            Class List
          </DialogDescription>
        </DialogHeader>

    
        <div className=" gap-6 mb-6 max-h-[400px] overflow-auto">

          <Table>
              <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Failed</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {data.map((student, index) => (
                      <TableRow key={index}>
                          <TableCell className="font-bold">{student.studentId}</TableCell>
                          <TableCell className="max-w-[250px]  text-gray-500  overflow-hidden">{student.studentName}</TableCell>
                          <TableCell>
                                <Button className="bg-red-500 hover:bg-red-600" onClick={() => failedHandler(student.studentName)}> Failed </Button>
                          </TableCell>
                      </TableRow>
                  ))}
                
              </TableBody>
          </Table>

        </div>

   
      </DialogContent>
    </Dialog>
  )
}
