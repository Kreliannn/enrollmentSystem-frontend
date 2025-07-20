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
import { getSectionInterface } from "@/app/types/section.type"
 

export function SectionDisplay({ section , passed} : { section  : getSectionInterface, passed : string[]}) {

  const [open, setOpen] = useState(false);

  console.log(section.subjects)
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button 
               className=""
            >
               View
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle> {section.section} </DialogTitle>
          <DialogDescription>   
            {`${section.course} : ${section.level} - ${section.sem}`}
          </DialogDescription>
        </DialogHeader>

    
        <div className="gap-6 mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Prerequisite</TableHead>
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
              {section.subjects.map((sub, index) => {
                return (
                  <TableRow key={index} className={`${(!passed.includes(sub.prerequisite) && sub.prerequisite != "none") ? "bg-red-400 text-white hover:bg-red-400" : null }`}>
                    <TableCell className="font-bold">{sub.code}</TableCell>
                    <TableCell className="max-w-[220px] overflow-hidden">{sub.name}</TableCell>
                    <TableCell className={`${(!passed.includes(sub.prerequisite) && sub.prerequisite != "none") ? " font-bold" : null }`}>{sub.prerequisite}</TableCell>
                    <TableCell>{sub.units}</TableCell>
                    <TableCell>{sub.days}</TableCell>
                    <TableCell>{sub.start}</TableCell>
                    <TableCell>{sub.end}</TableCell>
                    <TableCell>{sub.section}</TableCell>
                    <TableCell>{sub.room}</TableCell>
                    <TableCell className="w-62 ">{sub.instructor.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
