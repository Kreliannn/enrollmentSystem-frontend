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
 

export function DisplaySubCode({ sub} : { sub : string[]}) {

  const [open, setOpen] = useState(false);

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button className="" size={"sm"}  onClick={() => setOpen(true)}>
                view
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"passed sub"}</DialogTitle>
          <DialogDescription>   
           {"subject you passed"}
          </DialogDescription>
        </DialogHeader>

    
        <div className=" gap-2 mb-6 flex flex-wrap overflow-auto">
            {sub.map((item, index) => (
                <Badge  key={index} className={`${(true) ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} shadow`} > {item} </Badge>
            ))
            }

        </div>

      </DialogContent>
    </Dialog>
  )
}
