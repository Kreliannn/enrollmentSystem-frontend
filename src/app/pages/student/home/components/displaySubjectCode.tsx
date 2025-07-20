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
import { Badge } from "@/components/ui/badge"
 

export function DisplaySubCode({title, description, sub} : {title : string, description : string, sub : string[]}) {

  const [open, setOpen] = useState(false);

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button className="flex items-center gap-2 w-full h-full absolute top-0 left-0 opacity-0"  onClick={() => setOpen(true)}>
               
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>   
           {description}
          </DialogDescription>
        </DialogHeader>

    
        <div className=" gap-2 mb-6 flex flex-wrap overflow-auto">
            {sub.map((item, index) => (
                <Badge  key={index} className={`${(title == "passed") ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} shadow`} > {item} </Badge>
            ))
            }

        </div>

      </DialogContent>
    </Dialog>
  )
}
