"use client"
import { Button } from "@/components/ui/button"
import { confirmAlert, errorAlert, successAlert } from "@/app/utils/alert"
import { backendUrl } from "@/app/utils/url"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { error } from "console"

export default function Page(){

    const mutation = useMutation({
        mutationFn : () => axios.post(backendUrl("/student/nextSem")), 
        onSuccess : () => {  
            successAlert("next sem")
        },
        onError : () => errorAlert("error accour"),
    })

    const endSem = () => {
        confirmAlert("proceed to next sem, you cannot revert this", "Proceed", () => {
            mutation.mutate()
        })
    }


    return(
        <div className="w-full h-full">

            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> End Sem </h1>
                    <p className="text-gray-600">lre asdas da sd asd</p>
                </div>
            </div>

            <div className="m-auto w-4/6 flex justify-center items-center h-[500px]">
                <Button size={"lg"} onClick={endSem}> Proceed To Next Sem </Button>
            </div>
        </div>
    )
}