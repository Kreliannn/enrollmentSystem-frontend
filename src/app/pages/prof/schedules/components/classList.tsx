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
 import { confirmAlert, successAlert , errorAlert} from "@/app/utils/alert"
 import { profSubInterface } from "@/app/types/prof.type"
 import axios from "axios"
 import { backendUrl } from "@/app/utils/url"
 import { useMutation } from "@tanstack/react-query"
 import { useProfStore } from "@/app/store/profStore"


export function ClassList({ subject } : { subject : profSubInterface }) {

  const [open, setOpen] = useState(false);

  const {setProf, prof} = useProfStore()

  const mutation = useMutation({
    mutationFn : (data : { prof_id : string, student_id : string, subject_id  :string}) => axios.post(backendUrl("/prof/failedStudent"), data),
    onSuccess : (response) => {
      setProf(response.data)
      successAlert("student failed")
    },
    onError : () => errorAlert("ERROR ACCOUR")
  })

  const failedHandler = (student_id : string) => {
    setOpen(false)
    confirmAlert(`are you sure ${name} is failed on subject ${subject.name}?`, "failed", () => {
        if(!prof || !prof?._id) return
        mutation.mutate({ prof_id : prof?._id, student_id : student_id, subject_id  : subject._id})
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
          <DialogTitle> {subject.course} {subject.section} </DialogTitle>
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
                  {subject.students.map((student, index) => (
                      <TableRow key={index}>
                          <TableCell className="font-bold">{student.studentId}</TableCell>
                          <TableCell className="max-w-[250px]  text-gray-500  overflow-hidden">{student.name}</TableCell>
                          <TableCell>
                                <Button className="bg-red-500 hover:bg-red-600" onClick={() => failedHandler(student._id)}> Failed </Button>
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
