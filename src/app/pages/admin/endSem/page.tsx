"use client"
import { Button } from "@/components/ui/button"
import { confirmAlert, errorAlert, successAlert } from "@/app/utils/alert"
import { backendUrl } from "@/app/utils/url"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

export default function Page(){
    const [password, setPassword] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const mutation = useMutation({
        mutationFn : () => axios.post(backendUrl("/student/nextSem")), 
        onSuccess : () => {  
            successAlert("next sem")
        },
        onError : () => errorAlert("error occur"),
    })

    const endSem = () => {
        confirmAlert("proceed to next sem, you cannot revert this", "Proceed", () => {
            mutation.mutate()
        })
    }
    

    
    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password === "123") {
            setIsAuthenticated(true)
            successAlert("Access granted")
        } else {
            errorAlert("Invalid password")
            setPassword("")
        }
    }

    return(
        <div className="w-full h-full">
            <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2"> End Sem </h1>
                    <p className="text-gray-600">Semester management system</p>
                </div>
            </div>

            <div className="m-auto w-4/6 flex justify-center items-center h-[500px]">
                {!isAuthenticated ? (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Enter Password to Continue</h2>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <div>
                                <Button type="submit" size="lg">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <Button size={"lg"} onClick={endSem} disabled={mutation.isPending}>
                        {mutation.isPending ? "Processing..." : "Proceed To Next Sem"}
                    </Button>
                )}
            </div>
        </div>
    )
}