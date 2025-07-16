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
 

export function SubjectDisplay({ year, course , code} : { year : yearLevelInterface, course : string, code : string}) {

  const [open, setOpen] = useState(false);

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button 
               
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200"
            >
                {year.level} - {year.sem}
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> {course} </DialogTitle>
          <DialogDescription>   
             subject for {code}
          </DialogDescription>
        </DialogHeader>

    
        <div className=" gap-6 mb-6">


          <Table>
              <TableHeader>
                  <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Type</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {year.subjects.map((sub, index) => (
                      <TableRow key={index}>
                          <TableCell className="font-bold">{sub.code}</TableCell>
                          <TableCell className="max-w-[250px]  text-gray-500  overflow-hidden">{sub.name}</TableCell>
                          <TableCell>{sub.units}</TableCell>
                          <TableCell>{sub.type}</TableCell>
                      </TableRow>
                  ))}
                
              </TableBody>
          </Table>

        </div>

   
      </DialogContent>
    </Dialog>
  )
}
