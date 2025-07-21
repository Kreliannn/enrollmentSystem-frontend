"use client"

import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getQueueInterface } from "@/app/types/queue.type"
import { successAlert , errorAlert, confirmAlert} from "@/app/utils/alert"
import { useStudentStore } from "@/app/store/studentStore"


export default function Page() {

    const {student} = useStudentStore()

    const [queue, setQueue] = useState<getQueueInterface[]>([])

    const [type, setType] = useState("")

    const { data } = useQuery({
      queryKey : ["Queue"],
      queryFn : () => axios.get(backendUrl("/queue"))
    })
  
    useEffect(() => { data?.data && setQueue(data.data) }, [data])

    const mutation = useMutation({
        mutationFn : (data : { queueId : string }) => axios.post(backendUrl(`/queue/${type}`), data),
        onSuccess : (response) => {
            setQueue(response.data)
            successAlert("next queue number")
            setType("")
        },
        onError : () => errorAlert("error accccour")
    })

    const queueSubmit = (queueId : string, type : string) => {
        confirmAlert(`${type} Queue Number`, "next queue", () => {
            setType(type)
            mutation.mutate({queueId})
        })
    }

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Queue</h1>
          <p className="text-gray-600">Payment processing line</p>
        </div>
      </div>

      {/* Main Queue Section */}
      {queue.length != 0 && (
        <div className="w0full">
         

            {/* Queue List */}
            <div className="bg-white shadow-lg rounded-2xl p-6 h-[550px] overflow-auto w-4/6 m-auto mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Waiting Queue</h3>
            <div className="space-y-2">
                {queue.map((item, index) => (
                <div
                    key={index}
                    className={`${(student?.studentId == item.student.studentId) ? "bg-green-500 " : null} flex justify-between items-center border rounded-xl px-4 py-3 shadow-md`}
                >
                    <p className={` text-lg font-bold   ${(student?.studentId == item.student.studentId) ? "text-white " : "text-blue-700"}`}>#{item.number}</p>
                    {item.student ? (
                    <p  className={` text-sm   ${(student?.studentId == item.student.studentId) ? "text-white " : "text-gray-700"}`}>{item.student.studentId}</p>
                    ) : (
                    <p className="text-sm text-red-500">No student</p>
                    )}
                    <p  className={` text-sm   ${(student?.studentId == item.student.studentId) ? "text-white " : "text-gray-700"}`}>{item.date}</p>
                </div>
                ))}
                {queue.length <= 1 && (
                <p className="text-gray-500 text-sm">No more students in queue.</p>
                )}
            </div>
            </div>
        </div>
      )}
     
    </div>
  )
}
