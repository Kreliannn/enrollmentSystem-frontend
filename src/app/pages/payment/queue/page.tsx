"use client"

import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getQueueInterface } from "@/app/types/queue.type"
import { successAlert , errorAlert, confirmAlert} from "@/app/utils/alert"



export default function Page() {

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Current Queue */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between h-[550px] relative">
                <Button variant={"destructive"} className="absolute top-5 right-2" onClick={() => queueSubmit(queue[0]._id, "clear")}>
                    Reset
                </Button>

                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-4xl font-semibold text-gray-800 text-center">Current Queue</h3>
                </div>

                {/* Number + Student */}
                <div className="text-center">
                    <h2 className="text-8xl font-bold text-blue-600" style={{fontSize : "150px"}}>{queue[0].number}</h2>
                    <p className="mt-4 text-gray-500 text-2xl">{queue[0].student.name}</p>
                    <p className="mt-4 text-gray-500 text-xl">{queue[0].student.studentId}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-2 mt-6">
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-4" onClick={() => queueSubmit(queue[0]._id, "complete")}>
                        <CheckCircle className="mr-2 h-6 w-6" />
                        Completed
                    </Button>
                    <Button className="text-lg px-6 py-4" onClick={() => queueSubmit(queue[0]._id, "void")}>
                        <RotateCcw className="mr-2 h-6 w-6" />
                        Void
                    </Button>
                </div>
                </div>

            {/* Queue List */}
            <div className="bg-white shadow-lg rounded-2xl p-6 h-[550px] overflow-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Waiting Queue</h3>
            <div className="space-y-4">
                {queue.slice(1).map((item, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center border rounded-xl px-4 py-3 shadow-lg"
                >
                    <p className="text-lg font-bold text-blue-700">#{item.number}</p>
                    {item.student ? (
                    <p className="text-sm text-gray-600">{item.student.name}</p>
                    ) : (
                    <p className="text-sm text-red-500">No student</p>
                    )}
                    {item.student ? (
                    <p className="text-sm text-gray-600">{item.student.studentId}</p>
                    ) : (
                    <p className="text-sm text-red-500">No student</p>
                    )}
                    <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                ))}
                {queue.length <= 1 && (
                <p className="text-gray-500 text-sm">No more students in queue.</p>
                )}
            </div>
            </div>
        </div>
      )}


    {queue.length == 0 && (
        <div className="w-full h-[500px] flex items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-700">
                No Pending Queue
            </h1>
        </div>
    )}
     
    </div>
  )
}
